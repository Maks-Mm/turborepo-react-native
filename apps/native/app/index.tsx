// apps/native/app/index.tsx (NATIVE)
import { View, ScrollView } from 'react-native';
import { Header, Footer, Hero, Section, Nav } from '@repo/ui'; // Native components

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Nav /> {/* NOW WORKS */}
      <ScrollView>
        <Hero />
        <Section />
        <Footer />
      </ScrollView>
    </View>
  );
}