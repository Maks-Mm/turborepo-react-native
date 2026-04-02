//apps/api/src/jobs/fetchUpdates.ts

import prisma from "@repo/db"; // default import

export async function fetchUpdates() {
  const mockData = [
    {
      title: "Neue Steuerregelung 2026",
      content: "Details zur Reform...",
      category: "tax",
      source: "BMF",
      sourceUrl: "https://www.bundesfinanzministerium.de",
      publishedAt: new Date()
    }
  ];

  for (const item of mockData) {
    await prisma.taxUpdate.upsert({
      where: { title_sourceUrl: { title: item.title, sourceUrl: item.sourceUrl } },
      update: {},
      create: item,
    });
  }
}