//apps/api/src/types/custom.d.ts

declare module '@repo/db' {
  import { PrismaClient } from '@prisma/client';
  const db: { prisma: PrismaClient };
  export default db;
}