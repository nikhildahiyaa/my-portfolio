// src/components/three/coreShaders.js — GLSL for the Data Core (no dependencies).

export const pointVert = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uTwinkle;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float tw = 1.0 - uTwinkle + uTwinkle * (0.5 + 0.5 * sin(uTime * 1.6 + aSeed * 40.0));
    gl_PointSize = aSize * uPixelRatio * tw * (8.2 / -mv.z);
    vAlpha = mix(0.22, 1.0, smoothstep(-10.0, -6.4, mv.z));
    float g = smoothstep(-1.8, 1.8, position.y * 0.8 + position.x * 0.5);
    vColor = mix(uColorA, uColorB, g);
  }
`;

export const pointFrag = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float halo = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.16, 0.0, d);
    vec3 col = vColor * halo + vec3(1.0) * core * 0.75;
    gl_FragColor = vec4(col, (halo * 0.55 + core) * vAlpha * uOpacity);
  }
`;

export const lineVert = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vAlpha = mix(0.08, 1.0, smoothstep(-10.0, -6.4, mv.z));
    vColor = mix(uColorA, uColorB, smoothstep(-1.8, 1.8, position.y * 0.8 + position.x * 0.5));
  }
`;

export const lineFrag = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() { gl_FragColor = vec4(vColor, vAlpha * uOpacity); }
`;

export const fresnelVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    vPos = position;
    gl_Position = projectionMatrix * mv;
  }
`;

export const fresnelFrag = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    float f = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.2);
    float sweep = 0.5 + 0.5 * sin(vPos.y * 3.0 - uTime * 0.8);
    vec3 col = mix(uColorA, uColorB, clamp(f + sweep * 0.25, 0.0, 1.0));
    // faint facet sheen + strong rim = glass
    float a = (0.015 + f * 0.7) * uIntensity;
    gl_FragColor = vec4(col * (0.2 + f * 1.5), a);
  }
`;

export const ringVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

export const ringFrag = /* glsl */ `
  #define TAU 6.28318530718
  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float ang = vUv.x * TAU;
    // travelling light arc (comet): sharp head, long tail
    float phase = mod(ang - uTime * uSpeed, TAU) / TAU;
    float tail = pow(phase, 10.0);
    // brushed-metal base: specular band from view angle
    float spec = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 1.5);
    vec3 metal = vec3(0.62, 0.62, 0.74) * (0.25 + spec * 0.55);
    vec3 col = mix(metal, uColor * 1.6 + 0.25, tail);
    float a = 0.28 + spec * 0.25 + tail * 0.9;
    gl_FragColor = vec4(col, a);
  }
`;

