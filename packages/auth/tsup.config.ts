 // packages/auth/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  external: ['react', 'react-dom', 'firebase', 'firebase/auth'],
  dts: true,                    
  splitting: false,
  sourcemap: true,
  clean: true,
});