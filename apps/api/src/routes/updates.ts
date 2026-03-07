//apps/api/src/routes/updates.ts


import { Router } from "express";
import db from "@repo/db";

const router = Router();
const { prisma } = db;

router.get("/", async (req, res) => {
  try {
    const updates = await prisma.update.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch updates" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    const update = await prisma.update.create({
      data: {
        title,
        description
      }
    });

    res.json(update);
  } catch (error) {
    res.status(500).json({ error: "Failed to create update" });
  }
});

export default router;
