//services/api/src/routes/updates.ts

import { Router } from "express";
import prisma from "@repo/db"; 

const router = Router();

router.get("/", async (req, res) => {
  try {
    // Capitalization must match Prisma model name
    const updates = await prisma.taxUpdate.findMany({
      orderBy: { publishedAt: "desc" }
    });
    res.json(updates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch updates" });
  }
});

export default router;