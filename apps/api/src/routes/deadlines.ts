//apps/api/routes/deadlines.ts

import { Router } from 'express';
import db from '@repo/db';
import prisma from "@repo/db"; // default import

const router = Router();

router.get('/user/:userId', async (req, res) => {
  try {
    const deadlines = await prisma.deadline.findMany({
      where: { userId: req.params.userId },
      orderBy: { dueDate: 'asc' }
    });
    res.json(deadlines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deadlines' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, title, description, dueDate, type } = req.body;
    const deadline = await prisma.deadline.create({
      data: {
        userId,
        title,
        description,
        dueDate: new Date(dueDate),
        type
      }
    });
    res.json(deadline);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create deadline' });
  }
});

// Deadline aktualisieren
router.patch('/:id', async (req, res) => {
  try {
    const { title, description, dueDate, type, isCompleted } = req.body;
    const deadline = await prisma.deadline.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        type,
        isCompleted
      }
    });
    res.json(deadline);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update deadline' });
  }
});

// Deadline löschen
router.delete('/:id', async (req, res) => {
  try {
    await prisma.deadline.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete deadline' });
  }
});

export default router;
