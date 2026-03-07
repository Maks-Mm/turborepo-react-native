//apps/api/tsup.config.ts
import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  sourcemap: true,
  clean: true,
  
  dts: false,
  external: ["@repo/db", "express"]
})