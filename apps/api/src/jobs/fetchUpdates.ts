//apps/api/src/jobs/fetchUpdates.ts

import db from "@repo/db";
const { prisma } = db;

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
    await prisma.taxUpdate.create({
      data: item
    });
  }
}