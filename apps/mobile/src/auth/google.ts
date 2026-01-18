//app/mobile/src/auth/google.ts

import * as Google from "expo-auth-session/providers/google";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@repo/auth";

export async function loginWithGoogleMobile(idToken: string) {
  const credential = GoogleAuthProvider.credential(idToken);
  return signInWithCredential(auth, credential);
}
