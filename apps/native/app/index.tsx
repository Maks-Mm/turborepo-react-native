// apps/native/app/index.tsx
import { View, ScrollView } from 'react-native';
import { Header, Nav, Hero, Footer, Section } from '@repo/ui'; 

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView>
        <Hero />
        <Section />
        <Footer />
      </ScrollView>
    </View>
  );
}