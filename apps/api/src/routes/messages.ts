//apps/api/src/routes/messages.ts

import { Router } from "express";
import db from "@repo/db";
import prisma from "@repo/db";

const router = Router();

router.get("/user/:userId", async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: { userId: req.params.userId },
      orderBy: { createdAt: "desc" }
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, content } = req.body;

    const message = await prisma.message.create({
      data: {
        userId,
        content
      }
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Failed to create message" });
  }
});

export default router;