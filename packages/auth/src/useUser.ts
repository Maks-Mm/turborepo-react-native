//package/auth/src/useUser.ts

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { User } from "@repo/types";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
      } else {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          language: "pl",
          businessType: "EINZELUNTERNEHMER",
          region: "NRW",
          createdAt: new Date().toISOString(),
        });
      }
    });
  }, []);

  return user;
}
