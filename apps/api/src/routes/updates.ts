//apps/api/src/routes/updates.ts

import { Router } from "express";
import db from "@repo/db";

const router = Router();
const { prisma } = db;

router.get("/", async (req, res) => {
  try {
    const updates = await prisma.taxUpdate.findMany({
  orderBy: { publishedAt: "desc" },
  take: 50
});

    res.json(updates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch updates" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, category, source, sourceUrl, publishedAt } = req.body;

    const update = await prisma.taxUpdate.create({
      data: {
        title,
        content,
        category,
        source,
        sourceUrl,
        publishedAt: new Date(publishedAt)
      }
    });

    res.json(update);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create update" });
  }
});

export default router;