// apps/native/app/_layout.tsx
import { Stack } from "expo-router";
import { AuthProvider } from "@repo/auth";

const AppLayout = () => {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}

export default AppLayout;