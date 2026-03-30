//apps/api/src/routes/tax.ts

import { Router } from "express";
import prisma from "@repo/db";

const router = Router();

router.get("/de", async (_req, res) => {
  try {
    const updates = await prisma.taxUpdate.findMany({
      orderBy: { publishedAt: "desc" },
      take: 50
    });

    res.json(updates);
  } catch {
    res.status(500).json({ error: "failed_to_fetch_tax_updates" });
  }
});

export default router;