//packages/ui/src/components/AuthButton.tsx
"use client"

import { login } from "@repo/auth"

 function AuthButton() {
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
export default AuthButton;