//packages/ui/src/components/Header.web.tsx

"use client";
import { useState } from "react";
import { headerStyles as s } from "./styles.web";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header style={s.header}>
      <div style={s.container}>

        {/* Logo */}
        <div style={s.logoWrapper}>
          <div style={s.logoBox}>D</div>
          <div>
            <strong>Doch.</strong>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              Für polnische Unternehmer in DE
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={s.actions}>

          {/* Language */}
          <div style={{ position: "relative" }}>
            <button style={s.button} onClick={() => setOpen(!open)}>
              🇵🇱 Polski ▾
            </button>

            {open && (
              <div style={s.dropdown}>
                <div style={s.dropdownItem}>🇵🇱 Polski</div>
                <div style={s.dropdownItem}>🇩🇪 Deutsch</div>
                <div style={s.dropdownItem}>🇬🇧 English</div>
              </div>
            )}
          </div>

          {/* User */}
          <div>
            <strong>Jan Kowalski</strong>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              Einzelunternehmer
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
