// apps/web/src/components/Consulting.tsx

import { Router } from "express";
import prisma from "@repo/db";


const router = Router();

router.get("/sessions/:userId", async (req, res) => {
  try {
    const sessions = await prisma.consultingSession.findMany({
      where: { userId: req.params.userId },
      orderBy: { date: "asc" }
    });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch consulting sessions" });
  }
});

router.post("/book", async (req, res) => {
  try {
    const { userId, date, topic } = req.body;

    const session = await prisma.consultingSession.create({
      data: {
        userId,
        topic,
        date: new Date(date)
      }
    });

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Failed to book session" });
  }
});

export default router;