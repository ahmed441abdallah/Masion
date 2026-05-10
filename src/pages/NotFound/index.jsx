import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

function useGlitchText(text, delay = 600) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let raf;
    const totalFrames = 18;

    const tick = () => {
      frame++;
      el.textContent = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          const revealAt = Math.floor((i / text.length) * totalFrames * 0.7);
          if (frame > revealAt + totalFrames * 0.3) return ch;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");
      if (frame < totalFrames) raf = requestAnimationFrame(tick);
      else el.textContent = text;
    };

    const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [text, delay]);

  return ref;
}

export default function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const h1Ref = useGlitchText("404", 400);
  const subRef = useGlitchText("PAGE NOT FOUND", 900);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&display=swap');

        @keyframes nf-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nf-lineGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes nf-scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes nf-flicker {
          0%, 95%, 100% { opacity: 1; }
          96%            { opacity: 0.7; }
          97%            { opacity: 1; }
          98%            { opacity: 0.85; }
        }
        @keyframes nf-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.12); }
          50%       { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
        }
        @keyframes nf-cornerFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .nf-root {
          position: fixed;
          inset: 0;
          background: #0c0c0c;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          animation: nf-flicker 8s ease-in-out infinite;
        }
        .nf-scanline {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .nf-scanline::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(transparent, rgba(255,255,255,0.03), transparent);
          animation: nf-scanline 6s linear infinite;
        }
        .nf-noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        .nf-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(100px, 20vw, 200px);
          font-weight: 300;
          color: rgba(255,255,255,0.92);
          line-height: 1;
          letter-spacing: 0.08em;
          animation: nf-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .nf-rule {
          width: clamp(60px, 12vw, 120px);
          height: 1px;
          background: rgba(255,255,255,0.2);
          transform-origin: center;
          animation: nf-lineGrow 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s both;
          margin: 12px 0 16px;
        }
        .nf-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(8px, 1.2vw, 11px);
          font-weight: 500;
          letter-spacing: 0.38em;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          animation: nf-fadeUp 0.6s ease 1s both;
        }
        .nf-path {
          margin-top: 6px;
          font-family: 'Courier New', monospace;
          font-size: clamp(9px, 1vw, 11px);
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.05em;
          animation: nf-fadeUp 0.6s ease 1.2s both;
        }
        .nf-msg {
          margin-top: 32px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(14px, 2vw, 18px);
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.06em;
          font-style: italic;
          animation: nf-fadeUp 0.6s ease 1.4s both;
          text-align: center;
          max-width: 380px;
        }
        .nf-actions {
          display: flex;
          gap: 16px;
          margin-top: 44px;
          animation: nf-fadeUp 0.6s ease 1.7s both;
        }
        .nf-btn-primary {
          padding: 12px 32px;
          background: rgba(255,255,255,0.92);
          color: #0c0c0c;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 0.25s, color 0.25s, transform 0.2s;
          animation: nf-pulse 3s ease-in-out 2.5s infinite;
        }
        .nf-btn-primary:hover {
          background: #fff;
          transform: translateY(-1px);
        }
        .nf-btn-ghost {
          padding: 12px 28px;
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.14);
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s, transform 0.2s;
        }
        .nf-btn-ghost:hover {
          border-color: rgba(255,255,255,0.38);
          color: rgba(255,255,255,0.7);
          transform: translateY(-1px);
        }

        .nf-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          animation: nf-cornerFade 1s ease 0.3s both;
        }
        .nf-corner--tl { top: 28px;    left: 28px;    border-top:    1px solid rgba(255,255,255,0.12); border-left:  1px solid rgba(255,255,255,0.12); }
        .nf-corner--tr { top: 28px;    right: 28px;   border-top:    1px solid rgba(255,255,255,0.12); border-right: 1px solid rgba(255,255,255,0.12); }
        .nf-corner--bl { bottom: 28px; left: 28px;    border-bottom: 1px solid rgba(255,255,255,0.12); border-left:  1px solid rgba(255,255,255,0.12); }
        .nf-corner--br { bottom: 28px; right: 28px;   border-bottom: 1px solid rgba(255,255,255,0.12); border-right: 1px solid rgba(255,255,255,0.12); }

        .nf-brand {
          position: absolute;
          bottom: 36px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.35em;
          color: rgba(255,255,255,0.14);
          text-transform: uppercase;
          animation: nf-fadeUp 0.6s ease 2s both;
        }
      `}</style>

      <div className="nf-root">
        {/* Texture layers */}
        <div className="nf-scanline" />
        <div className="nf-noise" />

        {/* Corner accents */}
        <div className="nf-corner nf-corner--tl" />
        <div className="nf-corner nf-corner--tr" />
        <div className="nf-corner nf-corner--bl" />
        <div className="nf-corner nf-corner--br" />

        {/* 404 number */}
        <div className="nf-num" ref={h1Ref}>404</div>

        {/* Divider */}
        <div className="nf-rule" />

        {/* Subtitle */}
        <div className="nf-sub" ref={subRef}>Page Not Found</div>

        {/* Attempted path */}
        <div className="nf-path">{location.pathname}</div>

        {/* Message */}
        <p className="nf-msg">
          The page you are looking for has been moved, removed, or perhaps never existed.
        </p>

        {/* CTA buttons */}
        <div className="nf-actions">
          <button className="nf-btn-primary" onClick={() => navigate("/")}>
            Return Home
          </button>
          <button className="nf-btn-ghost" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>

        {/* Brand watermark */}
        <div className="nf-brand">Maison</div>
      </div>
    </>
  );
}
