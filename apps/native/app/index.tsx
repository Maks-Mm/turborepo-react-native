// apps/native/app/index.tsx
import { View, ScrollView } from 'react-native';
import { Header, Nav, Hero, Footer, Section } from '@repo/ui';
import HeaderNative from '../../../packages/ui/src/components/Header/Header.native';



export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <HeaderNative />
      <Nav />
      <ScrollView>
        <Hero />
        <Section />
        <Footer />
      </ScrollView>
    </View>
  );
}