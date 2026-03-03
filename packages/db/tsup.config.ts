//packages/db/tsup.config.ts

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'], // <-- ensure ESM output
  dts: true,
  sourcemap: true,
  clean: true,
});