"use client";

import { useAuth } from "@repo/auth";

function AuthButton() {
  
  const { login } = useAuth();

  return (
    <button
      onClick={() => login("test@test.com", "123")}
    >
      Login
    </button>
  );
}

export default AuthButton;
