// packages/api-client/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  external: ['@repo/types'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});