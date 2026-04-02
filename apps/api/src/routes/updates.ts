    // apps/api/src/routes/updates.ts

import { Router } from "express";
import prisma from "@repo/db"; // default import

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const updates = await prisma.taxUpdate.findMany({
      orderBy: { publishedAt: "desc" },
      take: 50
    });
    res.json(updates);
  } catch (error) {
    console.error("Updates error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;