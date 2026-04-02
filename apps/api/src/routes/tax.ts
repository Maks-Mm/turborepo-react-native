//apps/api/src/routes/tax.ts

import { Router } from "express";
import prisma from "@repo/db"; // default import

const router = Router();

router.get("/de", async (_req, res) => {
  try {
    const updates = await prisma.taxUpdate.findMany({
      orderBy: { publishedAt: "desc" },
      take: 50
    });
    res.json(updates);
  } catch (error) {
    console.error("Tax updates error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;