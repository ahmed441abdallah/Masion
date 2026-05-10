import { useEffect, useState } from "react";

const LETTERS = "MAISON".split("");

const PageLoader = ({ onComplete }) => {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("exit"), 2400);
    const doneTimer = setTimeout(() => onComplete?.(), 3100);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <>
      <style>{`
        @keyframes ml-letterIn {
          from { opacity: 0; transform: translateY(14px); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
        }
        @keyframes ml-ruleGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes ml-subFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ml-dotPulse {
          0%, 100% { opacity: 0.2; transform: scale(0.85); }
          50%       { opacity: 1;   transform: scale(1.1); }
        }
        @keyframes ml-exit {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(-24px) scale(0.98); }
        }

        .ml-letter {
          display: inline-block;
          opacity: 0;
          animation: ml-letterIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .ml-exit {
          animation: ml-exit 0.65s cubic-bezier(0.76, 0, 0.24, 1) forwards !important;
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#0c0c0c",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          pointerEvents: "all",
        }}
        className={phase === "exit" ? "ml-exit" : ""}
      >
        {/* Corner accents */}
        <CornerAccent pos="top-left" />
        <CornerAccent pos="top-right" />
        <CornerAccent pos="bottom-left" />
        <CornerAccent pos="bottom-right" />

        {/* Wordmark */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(36px, 8vw, 72px)",
            fontWeight: 300,
            letterSpacing: "0.40em",
            color: "rgba(255,255,255,0.93)",
            textTransform: "uppercase",
            paddingRight: "0.40em",
          }}
        >
          {LETTERS.map((ch, i) => (
            <span
              key={i}
              className="ml-letter"
              style={{ animationDelay: `${0.12 + i * 0.09}s` }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Ruled line */}
        <div
          style={{
            width: "clamp(100px, 18vw, 200px)",
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.22)",
            transformOrigin: "left center",
            animation: "ml-ruleGrow 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s both",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(7px, 1.1vw, 10px)",
            fontWeight: 400,
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.38)",
            textTransform: "uppercase",
            animation: "ml-subFade 0.6s ease 1.3s both",
          }}
        >
          Paris · Est. 2018
        </div>

        {/* Loading dots */}
        <div
          style={{
            display: "flex",
            gap: "7px",
            marginTop: "28px",
            animation: "ml-subFade 0.4s ease 1.6s both",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.45)",
                display: "inline-block",
                animation: `ml-dotPulse 1.1s ease-in-out ${1.7 + i * 0.18}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const CORNER_STYLES = {
  "top-left":     { top: 28, left: 28,  borderTop: "1px solid rgba(255,255,255,0.14)", borderLeft:  "1px solid rgba(255,255,255,0.14)" },
  "top-right":    { top: 28, right: 28, borderTop: "1px solid rgba(255,255,255,0.14)", borderRight: "1px solid rgba(255,255,255,0.14)" },
  "bottom-left":  { bottom: 28, left: 28,  borderBottom: "1px solid rgba(255,255,255,0.14)", borderLeft:  "1px solid rgba(255,255,255,0.14)" },
  "bottom-right": { bottom: 28, right: 28, borderBottom: "1px solid rgba(255,255,255,0.14)", borderRight: "1px solid rgba(255,255,255,0.14)" },
};

const CornerAccent = ({ pos }) => (
  <div
    style={{
      position: "absolute",
      width: 22,
      height: 22,
      ...CORNER_STYLES[pos],
      animation: "ml-subFade 0.8s ease 0.3s both",
    }}
  />
);

export default PageLoader;
