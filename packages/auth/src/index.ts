// packages/auth/src/index.ts

export { auth, db } from './firebase';
export { AuthProvider, useAuth } from './AuthContext';

export * from "./firebase";
export * from "./AuthContext";
//export * from "./src";

export * from './actions'
export * from './AuthContext'
export * from './ProtectedRoute'
export * from './firebase'