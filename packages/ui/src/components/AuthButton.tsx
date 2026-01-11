//packages/ui/src/components/AuthButton.tsx
"use client"

import { login } from "@myorg/auth"

export function AuthButton() {
  return (
    <button
      onClick={() => {
        console.log(login("test@test.com", "123"))
      }}
    >
      Login
    </button>
  )
}
