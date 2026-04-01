// packages/db/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: {
    resolve: false 
  },
  external: ['@prisma/client', '@repo/api-client'], 
  clean: true,
});