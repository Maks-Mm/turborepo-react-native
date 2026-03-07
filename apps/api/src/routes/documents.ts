//apps/api/src/routes/documents.ts

import { Router } from "express";
import db from "@repo/db";

const router = Router();
const { prisma } = db;

router.get("/user/:userId", async (req, res) => {
  try {
    const docs = await prisma.document.findMany({
      where: { userId: req.params.userId },
      orderBy: { createdAt: "desc" }
    });

    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

export default router;