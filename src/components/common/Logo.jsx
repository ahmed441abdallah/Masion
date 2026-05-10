import React from "react";
import { Link } from "react-router-dom";

/**
 * Inline typographic logo — matches the generated MAISON wordmark.
 * color: "white" | "dark" (default)
 * size:  "sm" | "md" (default) | "lg"
 */
const Logo = ({ color = "dark", size = "md", href = "/" }) => {
  const isWhite = color === "white";

  const sizes = {
    sm: { wordmark: "13px", sub: "7px", rule: "1px", gap: "3px" },
    md: { wordmark: "16px", sub: "8px", rule: "1px", gap: "4px" },
    lg: { wordmark: "22px", sub: "9px", rule: "1px", gap: "5px" },
  };
  const s = sizes[size] || sizes.md;

  const textColor  = isWhite ? "rgba(255,255,255,0.92)" : "#1a1a1a";
  const subColor   = isWhite ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.38)";
  const ruleColor  = isWhite ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)";

  return (
    <Link
      to={href}
      style={{ textDecoration: "none", display: "inline-flex", flexDirection: "column", alignItems: "center", gap: s.gap, lineHeight: 1 }}
    >
      {/* Wordmark */}
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: s.wordmark,
          fontWeight: 300,
          letterSpacing: "0.30em",
          color: textColor,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          transition: "opacity 0.25s",
        }}
      >
        Maison
      </span>

      {/* Thin rule */}
      <span
        style={{
          display: "block",
          width: "100%",
          height: s.rule,
          backgroundColor: ruleColor,
        }}
      />

      {/* Subtitle */}
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: s.sub,
          fontWeight: 400,
          letterSpacing: "0.28em",
          color: subColor,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        Paris · Est. 2018
      </span>
    </Link>
  );
};

export default Logo;
