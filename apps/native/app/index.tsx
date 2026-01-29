// apps/native/app/index.tsx (NATIVE)
import { View, ScrollView } from 'react-native';
import { Header, Hero, Footer, Section } from '@repo/ui'; // Native components

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header /> {/* Header.native */}
      <ScrollView>
        <Hero />
        <Section />
        <Footer />
      </ScrollView>
    </View>
  );
}