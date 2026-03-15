//packages/db/src/index.ts

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const globalForPrisma = globalThis as any;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Export the Prisma client directly, not wrapped in an object
export default prisma;
export * from "@prisma/client";