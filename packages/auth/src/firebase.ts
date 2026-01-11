//packages/auth/src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN!,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
