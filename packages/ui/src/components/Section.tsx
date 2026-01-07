// packages/ui/src/components/Section.tsx
import React from "react";

type Feature = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const FEATURES: Feature[] = [
  {
    title: "Deadline & Obligation Control",
    description:
      "All mandatory deadlines and filings in one place — helping you avoid penalties and missed obligations.",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="12" y1="10" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    title: "Polish Legal & Tax Explanations",
    description:
      "German business and tax rules explained clearly in Polish, step by step.",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l9 4-9 4-9-4 9-4z" />
        <path d="M12 10v12" />
        <path d="M12 16l6-4-6-4-6 4 6 4z" />
      </svg>
    ),
  },
  {
    title: "Smart Business Dashboard",
    description:
      "A focused overview showing only what matters now — no clutter, no confusion.",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="6" x2="12" y2="12" />
        <line x1="12" y1="12" x2="16" y2="14" />
      </svg>
    ),
  },
  {
    title: "Document Management & Proof",
    description:
      "Secure storage of invoices and documents, ready for audits or official requests.",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
      </svg>
    ),
  },
  {
    title: "Expert Access When Needed",
    description:
      "Optional access to Polish-speaking tax and legal professionals when decisions matter.",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7 7 0 0113 0" />
      </svg>
    ),
  },
  {
    title: "Security & Compliance First",
    description:
      "Your data is protected using modern security standards and EU-compliant practices.",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 1l9 4v6c0 6-3 10-9 12-6-2-9-6-9-12V5l9-4z" />
      </svg>
    ),
  },
];

export default function Section() {
  return (
    <section
      style={{
        padding: "5rem 1.5rem",
        maxWidth: "1280px",
        margin: "0 auto",
        backgroundColor: "transparent",
      }}
    >
      <h2
        style={{
          fontSize: "2.4rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "3.5rem",
          color: "#1a1a1a",
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
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>{feature.icon}</div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
                color: "#1a1a1a",
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "#4a5568",
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
