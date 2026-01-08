// apps/native/app/index.tsx
import { View, ScrollView } from 'react-native';
import { Header, Nav, Hero, Footer, Section } from '@repo/ui'; 
import HeaderNative from '@repo/ui/src/components/Header.native';

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