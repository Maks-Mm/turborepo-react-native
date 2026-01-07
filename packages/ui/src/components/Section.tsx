// packages/ui/src/components/Section.tsx
import React from "react";

// Define the Feature type
type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

// Feature data with icons
const FEATURES: Feature[] = [
  {
    title: "Deadline & Obligation Control",
    description:
      "All mandatory deadlines and filings in one place — helping you avoid penalties and missed obligations.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <path d="M8 14h.01"></path>
        <path d="M12 14h.01"></path>
        <path d="M16 14h.01"></path>
        <path d="M8 18h.01"></path>
        <path d="M12 18h.01"></path>
        <path d="M16 18h.01"></path>
      </svg>
    )
  },
  {
    title: "Polish Legal & Tax Explanations",
    description:
      "German business and tax rules explained clearly in Polish, step by step.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12" y2="16"></line>
      </svg>
    )
  },
  {
    title: "Smart Business Dashboard",
    description:
      "A focused overview showing only what matters now — no clutter, no confusion.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9"></rect>
        <rect x="14" y="3" width="7" height="5"></rect>
        <rect x="3" y="15" width="7" height="6"></rect>
        <rect x="14" y="13" width="7" height="8"></rect>
      </svg>
    )
  },
  {
    title: "Document Management & Proof",
    description:
      "Secure storage of invoices and documents, ready for audits or official requests.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    )
  },
  {
    title: "Expert Access When Needed",
    description:
      "Optional access to Polish-speaking tax and legal professionals when decisions matter.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
        <line x1="18" y1="8" x2="23" y2="13"></line>
        <line x1="23" y1="8" x2="18" y2="13"></line>
      </svg>
    )
  },
  {
    title: "Security & Compliance First",
    description:
      "Your data is protected using modern security standards and EU-compliant practices.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    )
  },
];

export default function Section() {
  return (
    <section
      style={{
        padding: "5rem 1.5rem",
        maxWidth: "1280px",
        margin: "0 auto",
        backgroundColor: "#f8fafc",
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
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  color: "#3b82f6", // Blue accent color for icons
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {feature.icon}
              </div>
            </div>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
                color: "#1a1a1a",
                textAlign: "center",
              }}
            >
              {feature.title}
            </h3>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "#4a5568",
                textAlign: "center",
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