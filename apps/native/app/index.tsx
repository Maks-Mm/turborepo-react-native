// apps/native/app/index.tsx
import { View, ScrollView } from 'react-native';
import { Header,  Hero, Footer, Section } from '@repo/ui';
import HeaderNative from '../../../packages/ui/src/components/Header/Header.native';



export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <HeaderNative />
      <ScrollView>
        <Hero />
        <Section />
        <Footer />
      </ScrollView>
    </View>
  );
}