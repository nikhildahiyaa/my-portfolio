// src/components/three/coreScene.js
// The "Data Core" — signature WebGL sculpture for the hero, written against
// plain three.js with named imports so the bundler can tree-shake it.
//
// Layers (back → front):
//   dust field · translucent faceted core (fresnel glass) · wireframe lattice
//   · inner prism · nucleus glow · neural node shell + nearest-neighbour edges
//   · random-walk data packets · three metallic orbital rings with travelling
//   light and orbiting packets.
//
// All materials are tiny custom shaders: no lights, no external textures, no
// post-processing. 13 draw calls total.

import {
  AdditiveBlending,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  PerspectiveCamera,
  Points,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { CORE, adjacency, fibonacciSphere, mulberry32, nearestEdges } from "./coreGeometry";
import { fresnelFrag, fresnelVert, lineFrag, lineVert, pointFrag, pointVert, ringFrag, ringVert } from "./coreShaders";

const VIOLET = new Color("#8B5CF6");
const CYAN = new Color("#22D3EE");
const INDIGO = new Color("#6366F1");

function glowTexture() {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.15, "rgba(200,190,255,0.85)");
  g.addColorStop(0.45, "rgba(139,92,246,0.25)");
  g.addColorStop(1, "rgba(139,92,246,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

const additive = { transparent: true, depthWrite: false, blending: AdditiveBlending };

function pointMaterial({ colorA = VIOLET, colorB = CYAN, opacity = 1, twinkle = 0.35, dpr = 1 }) {
  return new ShaderMaterial({
    vertexShader: pointVert,
    fragmentShader: pointFrag,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: dpr },
      uTwinkle: { value: twinkle },
      uOpacity: { value: opacity },
      uColorA: { value: colorA },
      uColorB: { value: colorB },
    },
    ...additive,
  });
}

function fresnelMaterial(a, b, intensity) {
  return new ShaderMaterial({
    vertexShader: fresnelVert,
    fragmentShader: fresnelFrag,
    uniforms: { uColorA: { value: a }, uColorB: { value: b }, uTime: { value: 0 }, uIntensity: { value: intensity } },
    side: DoubleSide,
    ...additive,
  });
}

function attr(geo, name, data, size) {
  geo.setAttribute(name, new Float32BufferAttribute(data, size));
  return geo;
}

/**
 * Mounts the Data Core into `container`. Returns a controller:
 *   { setActive(bool), dispose() }
 * Throws if WebGL cannot be initialised (caller falls back to static SVG).
 */
export function createDataCore(container, { mobile = false, onReady } = {}) {
  const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75);
  const renderer = new WebGLRenderer({ antialias: !mobile || dpr < 1.5, alpha: true, powerPreference: "high-performance", stencil: false });
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText = "display:block;width:100%;height:100%;pointer-events:none";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0, 8.2);

  const disposables = [];
  const keep = (x) => (disposables.push(x), x);
  const rand = mulberry32(21);

  /* ── structure ── */
  const count = mobile ? CORE.nodes.mobile : CORE.nodes.desktop;
  const pts = fibonacciSphere(count, CORE.radius);
  const edges = nearestEdges(pts, CORE.k);
  const adj = adjacency(count, edges);

  const mats = {
    node: keep(pointMaterial({ dpr })),
    packet: keep(pointMaterial({ colorA: new Color("#C4B5FD"), colorB: new Color("#A5F3FC"), twinkle: 0, dpr })),
    dust: keep(pointMaterial({ colorA: INDIGO, colorB: VIOLET, opacity: 0.45, twinkle: 0.6, dpr })),
    ringPacket: keep(pointMaterial({ colorA: new Color("#E9D5FF"), colorB: new Color("#CFFAFE"), twinkle: 0, dpr })),
    edge: keep(
      new ShaderMaterial({
        vertexShader: lineVert,
        fragmentShader: lineFrag,
        uniforms: { uColorA: { value: VIOLET }, uColorB: { value: CYAN }, uOpacity: { value: 0.32 } },
        ...additive,
      })
    ),
    core: keep(fresnelMaterial(INDIGO, CYAN, 0.5)),
    coreInner: keep(fresnelMaterial(VIOLET, new Color("#F0ABFC"), 0.42)),
    wire: keep(new LineBasicMaterial({ color: "#A78BFA", opacity: 0.22, ...additive })),
  };
  const glowTex = keep(glowTexture());
  mats.glow = keep(new SpriteMaterial({ map: glowTex, opacity: 0.85, ...additive }));

  // nodes
  const nodeGeo = keep(new BufferGeometry());
  attr(nodeGeo, "position", pts.flat(), 3);
  attr(nodeGeo, "aSize", pts.map(() => (rand() < 0.12 ? 9 + rand() * 4 : 3.5 + rand() * 3)), 1);
  attr(nodeGeo, "aSeed", pts.map(() => rand()), 1);

  // edges
  const edgeGeo = keep(new BufferGeometry());
  attr(edgeGeo, "position", edges.flatMap(([a, b]) => [...pts[a], ...pts[b]]), 3);

  // random-walk packets travelling along the network
  const packetCount = mobile ? 8 : 16;
  const walkers = Array.from({ length: packetCount }, () => {
    const from = Math.floor(rand() * count);
    const nb = adj[from][Math.floor(rand() * adj[from].length)];
    return { from, to: nb.to, t: rand(), speed: 0.35 + rand() * 0.45 };
  });
  const packetGeo = keep(new BufferGeometry());
  attr(packetGeo, "position", new Float32Array(packetCount * 3), 3);
  attr(packetGeo, "aSize", walkers.map(() => 10), 1);
  attr(packetGeo, "aSeed", walkers.map(() => rand()), 1);

  // distant dust for atmospheric depth
  const dustCount = mobile ? 50 : 110;
  const dust = [];
  for (let i = 0; i < dustCount; i++) {
    const r = 3.2 + rand() * 2.8;
    const th = rand() * Math.PI * 2;
    const ph = Math.acos(2 * rand() - 1);
    dust.push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.7, r * Math.sin(ph) * Math.sin(th) - 1.5);
  }
  const dustGeo = keep(new BufferGeometry());
  attr(dustGeo, "position", dust, 3);
  attr(dustGeo, "aSize", Array.from({ length: dustCount }, () => 1.4 + rand() * 1.6), 1);
  attr(dustGeo, "aSeed", Array.from({ length: dustCount }, () => rand()), 1);

  /* ── scene graph ── */
  const root = new Group();
  const spin = new Group();
  scene.add(root);
  root.add(new Points(dustGeo, mats.dust));
  root.add(spin);

  const glow = new Sprite(mats.glow);
  glow.scale.set(1.5, 1.5, 1);
  spin.add(glow);

  const core = new Mesh(keep(new IcosahedronGeometry(0.92, 0)), mats.core); // flat facets → glass prism
  const lattice = new LineSegments(keep(new EdgesGeometry(keep(new IcosahedronGeometry(0.93, 1)))), mats.wire);
  core.add(lattice);
  const inner = new Mesh(keep(new IcosahedronGeometry(0.55, 0)), mats.coreInner);
  spin.add(core, inner);
  spin.add(new LineSegments(edgeGeo, mats.edge));
  spin.add(new Points(nodeGeo, mats.node));
  spin.add(new Points(packetGeo, mats.packet));

  const rings = CORE.rings.map((r, i) => {
    const mat = keep(
      new ShaderMaterial({
        vertexShader: ringVert,
        fragmentShader: ringFrag,
        uniforms: { uTime: { value: 0 }, uSpeed: { value: r.speed }, uColor: { value: new Color(r.color) } },
        ...additive,
      })
    );
    const geo = keep(new TorusGeometry(r.radius, mobile ? 0.008 : 0.0065, 6, mobile ? 160 : 256));
    const pg = keep(new BufferGeometry());
    attr(pg, "position", new Float32Array(6), 3);
    attr(pg, "aSize", [12, 8], 1);
    attr(pg, "aSeed", [i * 0.3, i * 0.3 + 0.5], 1);
    const g = new Group();
    g.rotation.set(...r.rot);
    g.add(new Mesh(geo, mat), new Points(pg, mats.ringPacket));
    root.add(g);
    return { ...r, mat, pg };
  });

  const timed = [mats.node, mats.packet, mats.dust, mats.ringPacket, mats.core, mats.coreInner, ...rings.map((r) => r.mat)];

  /* ── interaction ── */
  const pointer = { x: 0, y: 0 };
  const onMove = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  /* ── loop ── */
  let time = 0;
  let intro = 0;
  let last = 0;
  let raf = 0;
  let running = false;
  let readySent = false;

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const delta = Math.min(last ? (now - last) / 1000 : 0.016, 0.05); // clamp after pauses
    last = now;
    time += delta;

    intro = Math.min(1, intro + delta * 0.7);
    const e = 1 - Math.pow(1 - intro, 3);
    root.scale.setScalar(0.86 + 0.14 * e);

    spin.rotation.y += delta * 0.07;
    const k = 1 - Math.exp(-delta * 2.5);
    root.rotation.x += (pointer.y * 0.22 + 0.12 - root.rotation.x) * k;
    root.rotation.y += (pointer.x * 0.38 - root.rotation.y) * k;

    core.rotation.set(time * 0.05, -time * 0.12, 0);
    inner.rotation.set(0, time * 0.22, time * 0.1);

    for (const m of timed) m.uniforms.uTime.value = time;

    const pa = packetGeo.attributes.position.array;
    walkers.forEach((w, i) => {
      w.t += delta * w.speed;
      if (w.t >= 1) {
        const next = adj[w.to];
        w.from = w.to;
        w.to = next[Math.floor(Math.random() * next.length)].to;
        w.t = 0;
      }
      const a = pts[w.from];
      const b = pts[w.to];
      pa[i * 3] = a[0] + (b[0] - a[0]) * w.t;
      pa[i * 3 + 1] = a[1] + (b[1] - a[1]) * w.t;
      pa[i * 3 + 2] = a[2] + (b[2] - a[2]) * w.t;
    });
    packetGeo.attributes.position.needsUpdate = true;

    for (const r of rings) {
      const arr = r.pg.attributes.position.array;
      for (let j = 0; j < 2; j++) {
        const ang = time * r.speed * (j === 0 ? 1 : 0.6) + j * Math.PI;
        arr[j * 3] = Math.cos(ang) * r.radius;
        arr[j * 3 + 1] = Math.sin(ang) * r.radius;
      }
      r.pg.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
    if (!readySent) {
      readySent = true;
      onReady?.();
    }
  }

  function setActive(on) {
    if (on && !running) {
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    } else if (!on && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  }

  const onLost = (ev) => { ev.preventDefault(); setActive(false); };
  canvas.addEventListener("webglcontextlost", onLost);

  return {
    setActive,
    dispose() {
      setActive(false);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("webglcontextlost", onLost);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
