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
    <section ref={imageRef}>
      <h1>Business in Germany. Clear. In Polish.</h1>
      <p>For Polish entrepreneurs who want clarity, not fear.</p>
    </section>
  );
}
