// apps/native/app/index.tsx
import { View, ScrollView } from 'react-native';
// This pulls the components from your packages/ui folder
import { Nav, Hero, Footer,Section } from '@repo/ui'; 

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Nav /> 
      <ScrollView>
        <Hero />
        <Section />
        {/* Other page content goes here */}
        <Footer />
      </ScrollView>
    </View>
  );
}