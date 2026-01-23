//apps/native/app/(tabs)/index.tsx

import { View } from 'react-native';
import { NativeAuthButton } from '../../auth';

export default function HomeScreen() {
  return (
    <View className="flex-1 p-4">
      {/* Your other content */}
      <NativeAuthButton />
    </View>
  );
}