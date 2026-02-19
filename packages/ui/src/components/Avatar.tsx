//packages/ui/src/components/Avatar.tsx


import { Platform } from 'react-native';
import { User as UserNative } from 'lucide-react-native';
import { RxAvatar as UserWeb } from 'react-icons/rx';

export const Avatar = () => {
  return Platform.OS === 'web' ? <UserWeb size={20} /> : <UserNative size={20} />;
};
