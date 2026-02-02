//packages/ui/src/components/Nav/Nav.web.tsx

// Nav.web.tsx
"use client";
import React, { useState } from "react";
import { AuthButton } from "../auth/AuthButton";

const navItems = [
  { id: "dashboard", label: "Pulpit" },
  { id: "deadlines", label: "Fristen & Termine" },
  { id: "documents", label: "Dokumenty" },
  { id: "knowledge", label: "Wiedza" },
  { id: "experts", label: "Eksperci" },
];

export default function Nav() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: "1px solid",
                borderColor: activePage === item.id ? "#bfdbfe" : "transparent",
                background: activePage === item.id ? "#dbeafe" : "transparent",
                color: activePage === item.id ? "#2563eb" : "#4b5563"
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <AuthButton />
      </div>
    </nav>
  );
}
