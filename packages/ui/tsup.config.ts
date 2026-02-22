// packages/ui/tsup.config.ts


import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'react-native',
    'expo',
    'expo-router',
    'lucide-react-native',
    'react-icons'
  ],
});