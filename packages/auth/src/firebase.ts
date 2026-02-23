// packages/auth/src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let auth: Auth;
let db: Firestore;

// Check for Firebase API key
const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

if (!apiKey || apiKey.includes('your_api_key')) {
  console.warn('🔧 Firebase API key missing or placeholder detected, using mock Firebase');

  // Mock auth
  auth = {
    currentUser: null,
    signInWithEmailAndPassword: async (email: string) => ({ user: { uid: 'dev-user-id', email } }),
    createUserWithEmailAndPassword: async (email: string) => ({ user: { uid: 'dev-user-id', email } }),
    signOut: async () => {},
    onAuthStateChanged: (cb: (user: any) => void) => { cb(null); return () => {}; }
  } as any;

  // Mock Firestore
  db = {
    collection: (_name: string) => ({
      doc: (_id: string) => ({
        get: async () => ({ exists: false, data: () => null }),
        set: async (_data: any) => console.log('Mock set doc'),
        update: async (_data: any) => console.log('Mock update doc')
      }),
      add: async (_data: any) => {
        console.log('Mock add doc');
        return { id: 'mock-doc-id' };
      },
      where: () => ({ get: async () => ({ docs: [] }) })
    })
  } as any;

} else {
  // Real Firebase config
  const firebaseConfig = {
    apiKey,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
  };

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db };