// packages/auth/src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let auth: Auth;
let db: Firestore;

// Check if we have valid Firebase keys (not placeholders or dev keys)
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const hasValidKeys = apiKey &&
                   !apiKey.includes('your_api_key') &&
                   !apiKey.includes('dev') &&
                   !apiKey.includes('fake') &&
                   apiKey.length > 20; // Real Firebase keys are longer

if (!hasValidKeys) {
  // Mock Firebase for development - allows building UI without real keys
  console.log('🔧 Using mocked Firebase for development (firebase.ts)');

  // Create mock auth object
  auth = {
    currentUser: null,
    signInWithEmailAndPassword: async (email: string, password: string) => {
      console.log(`Mock sign in: ${email}`);
      return { user: { uid: 'dev-user-id', email } };
    },
    createUserWithEmailAndPassword: async (email: string, password: string) => {
      console.log(`Mock sign up: ${email}`);
      return { user: { uid: 'dev-user-id', email } };
    },
    signOut: async () => {
      console.log('Mock sign out');
    },
    onAuthStateChanged: (callback: (user: any) => void) => {
      callback(null); // Simulate logged out state
      return () => {}; // Unsubscribe function
    }
  } as any;

  // Create mock firestore object
  db = {
    collection: (name: string) => ({
      doc: (id: string) => ({
        get: async () => ({ exists: false, data: () => null }),
        set: async (data: any) => console.log(`Mock set doc ${id} in ${name}:`, data),
        update: async (data: any) => console.log(`Mock update doc ${id} in ${name}:`, data)
      }),
      add: async (data: any) => {
        console.log(`Mock add to ${name}:`, data);
        return { id: 'mock-doc-id' };
      },
      where: () => ({
        get: async () => ({ docs: [] })
      })
    })
  } as any;

} else {
  // Real Firebase initialization
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
  };

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db };
