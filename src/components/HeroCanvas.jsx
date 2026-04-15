import { useEffect, useRef } from "react";

/* Floating CSS wireframe shapes */
const SHAPES = [
  { size: 90,  top: "12%", left: "8%",  delay: "0s",   dur: "9s",  color: "#818cf8", clip: "polygon(50% 0%, 0% 100%, 100% 100%)" },
  { size: 70,  top: "60%", left: "5%",  delay: "2s",   dur: "11s", color: "#22d3ee", clip: "polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)" },
  { size: 80,  top: "15%", right: "7%", delay: "1s",   dur: "8s",  color: "#e879f9", clip: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)" },
  { size: 55,  top: "70%", right: "10%",delay: "3s",   dur: "13s", color: "#818cf8", clip: "polygon(50% 0%, 0% 100%, 100% 100%)" },
  { size: 100, top: "40%", left: "88%", delay: "0.5s", dur: "10s", color: "#22d3ee", clip: "polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)" },
  { size: 60,  top: "80%", left: "30%", delay: "4s",   dur: "12s", color: "#e879f9", clip: "polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)" },
];

function FloatingShapes() {
  return (
    <>
      <style>{`
        @keyframes floatShape {
          0%   { transform: translateY(0px) rotate(0deg);   opacity: 0.18; }
          50%  { transform: translateY(-22px) rotate(180deg); opacity: 0.28; }
          100% { transform: translateY(0px) rotate(360deg); opacity: 0.18; }
        }
      `}</style>
      {SHAPES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            right: s.right,
            background: s.color,
            clipPath: s.clip,
            animation: `floatShape ${s.dur} ${s.delay} ease-in-out infinite`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

/* Canvas 2D particle network */
export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const COLORS = ["#818cf8", "#22d3ee", "#e879f9"];
    const COUNT = 70;
    let particles = [];
    let animId;
    let mouse = { x: -9999, y: -9999 };

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      particles = Array.from({ length: COUNT }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r:  Math.random() * 2 + 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(129,140,248,${(1 - d / 130) * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      /* particles */
      for (const p of particles) {
        /* subtle mouse repulsion */
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          p.vx += (dx / d) * 0.08;
          p.vy += (dy / d) * 0.08;
        }

        /* speed cap */
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) { p.vx *= 0.95; p.vy *= 0.95; }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > canvas.width)  { p.x = canvas.width;  p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(draw);
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    init();
    draw();

    window.addEventListener("resize", () => { resize(); init(); });
    canvas.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingShapes />
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
        className="pointer-events-auto"
      />
    </div>
  );
}
