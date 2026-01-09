//packages/ui/src/components/Header/styles.web.ts

// packages/ui/src/components/Header/styles.web.ts
import type { CSSProperties } from "react";

export const headerStyles: Record<string, CSSProperties> = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
  },

  container: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 16px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logoBox: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #2563eb, #dc2626)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: "14px",
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  button: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    background: "transparent",
    cursor: "pointer",
  },

  dropdown: {
    position: "absolute",
    right: 0,
    marginTop: "8px",
    width: "180px",
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
  },

  dropdownItem: {
    padding: "8px 16px",
    cursor: "pointer",
  },
};

