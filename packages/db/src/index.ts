//packages/db/src/index.ts

import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"

dotenv.config()

const globalForPrisma = globalThis as any

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}