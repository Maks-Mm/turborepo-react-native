//packages/db/checkDocuments.ts

import prisma from "@repo/db"; // default import

async function main() {
  const documents = await prisma.document.findMany({
    take: 10,
  });
  console.log(documents);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());