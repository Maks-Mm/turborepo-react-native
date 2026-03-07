// packages/db/src/index.ts
import * as PrismaPkg from "@prisma/client";

const PrismaClient = (PrismaPkg as any).PrismaClient;

const globalForPrisma = globalThis as any;

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}