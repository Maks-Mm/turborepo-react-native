// packages/ui/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'], // Make sure this points to your index file
  format: ['cjs', 'esm'],
  external: ['react', 'react-dom', 'react-native'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});