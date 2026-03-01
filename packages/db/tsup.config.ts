//packages/db/tsup.config.ts

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'], // important
  dts: true,
  sourcemap: true,
  clean: true,
  watch: process.env.TS_UP_WATCH === 'true',
});