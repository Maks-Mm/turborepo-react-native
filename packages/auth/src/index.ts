//packages/auth/src/index.ts

export type User = {
  id: string
  email: string
}

export function login(email: string, password: string): User {
  return {
    id: "demo",
    email,
  }
}
