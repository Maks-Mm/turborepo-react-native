//packages/ui/src/components/Hero/Hero.web.tsx
"use client";
import React, { useEffect, useRef } from "react";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const xAxis = (window.innerWidth / 2 - e.clientX) / 50;
      const yAxis = (window.innerHeight / 2 - e.clientY) / 50;
      imageRef.current.style.transform = `translateX(${xAxis}px) translateY(${yAxis}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "800px",
        display: "flex",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* Background */}
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1679860750530-0d6602d3bda7?q=80&w=1170&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
          opacity: 0.45,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "5% 8%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "0.75rem",
              letterSpacing: "1px",
              color: "rgba(255,255,255,0.6)",
              marginRight: "1rem",
              fontWeight: 500,
            }}
          >
            <span>PL → DE</span>
            <div
              style={{
                width: "1px",
                height: "2rem",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.3), transparent)",
                margin: "0.5rem 0",
              }}
            />
            <span>BUSINESS</span>
          </div>

          <h1
            style={{
              fontSize: "8rem",
              fontWeight: 300,
              lineHeight: 0.8,
              color: "rgba(255,255,255,0.1)",
              letterSpacing: "-5px",
            }}
          >
            /01
          </h1>
        </div>

        <div style={{ maxWidth: "620px", marginTop: "2rem" }}>
          <h2
            style={{
              fontSize: "3.5rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              lineHeight: 1.1,
              background:
                "linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Business in Germany. <br />
            Clear. In Polish.
          </h2>

          <span
            style={{
              fontSize: "1.2rem",
              color: "rgba(255,255,255,0.9)",
              marginBottom: "2.5rem",
              display: "block",
            }}
          >
            For Polish entrepreneurs who want clarity, not fear.
          </span>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            <button
              style={{
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                border: "none",
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Start free →
            </button>
            <button
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: 500,
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              See how it works
            </button>
          </div>

          {/* Trust Items */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <TrustItem label="100%" value="Polish language" />
            <Divider />
            <TrustItem label="⚖️" value="Legally reviewed" />
            <Divider />
            <TrustItem label="📱" value="Easy to use" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Helpers */
function TrustItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{label}</div>
      <div
        style={{
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.7)",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: "1px",
        height: "30px",
        background: "rgba(255,255,255,0.2)",
      }}
    />
  );
}
