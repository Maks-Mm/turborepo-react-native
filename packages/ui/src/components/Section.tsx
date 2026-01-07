// packages/ui/src/components/Section.tsx
import React from "react";

// Define the Feature type
type Feature = {
  title: string;
  description: string;
};

// Make sure FEATURES is properly declared and exported if needed
const FEATURES: Feature[] = [
  {
    title: "Deadline & Obligation Control",
    description:
      "All mandatory deadlines and filings in one place — helping you avoid penalties and missed obligations.",
  },
  {
    title: "Polish Legal & Tax Explanations",
    description:
      "German business and tax rules explained clearly in Polish, step by step.",
  },
  {
    title: "Smart Business Dashboard",
    description:
      "A focused overview showing only what matters now — no clutter, no confusion.",
  },
  {
    title: "Document Management & Proof",
    description:
      "Secure storage of invoices and documents, ready for audits or official requests.",
  },
  {
    title: "Expert Access When Needed",
    description:
      "Optional access to Polish-speaking tax and legal professionals when decisions matter.",
  },
  {
    title: "Security & Compliance First",
    description:
      "Your data is protected using modern security standards and EU-compliant practices.",
  },
];

export default function Section() {
  return (
    <section
      style={{
        padding: "5rem 1.5rem",
        maxWidth: "1280px",
        margin: "0 auto",
        // LIGHT BACKGROUND - no dark effect here
        backgroundColor: "transparent", // or use a light color like "#f8fafc"
      }}
    >
      <h2
        style={{
          fontSize: "2.4rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "3.5rem",
          // DARK TEXT - keeping dark effect on text only
          color: "#1a1a1a", // Dark color for text
        }}
      >
        Built for Business in Germany
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            style={{
              // LIGHT CARD BACKGROUND - no dark glass effect
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "2rem",
              // Remove backdropFilter (glass effect)
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // Lighter shadow
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
                // DARK TEXT - keeping dark effect on text
                color: "#1a1a1a", // Dark color for text
              }}
            >
              {feature.title}
            </h3>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                // DARKER GRAY TEXT - keeping readable contrast
                color: "#4a5568", // Dark gray for description
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}