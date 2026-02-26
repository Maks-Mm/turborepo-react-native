//apps/api/src/routes/dashboard.ts

import { Router } from 'express';
//import { prisma } from '@repo/db';
import db from '@repo/db';

const router = Router();
const { prisma } = db;

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const today = new Date();

    // 🔥 Parallel statt 4x nacheinander
    const [
      openDeadlines,
      pendingDocuments,
      unreadMessages,
      nextDeadline
    ] = await Promise.all([
      prisma.deadline.count({
        where: { userId, isCompleted: false }
      }),
      prisma.document.count({
        where: { userId, status: 'pending' }
      }),
      prisma.message.count({
        where: { userId, isRead: false }
      }),
      prisma.deadline.findFirst({
        where: {
          userId,
          isCompleted: false,
          dueDate: { gte: today }
        },
        orderBy: { dueDate: 'asc' }
      })
    ]);

    let nextDeadlineData = null;

    if (nextDeadline) {
      const diffTime =
        new Date(nextDeadline.dueDate).getTime() - today.getTime();

      nextDeadlineData = {
        title: nextDeadline.title,
        dueDate: nextDeadline.dueDate,
        daysLeft: Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      };
    }

    res.json({
      openDeadlines,
      pendingDocuments,
      unreadMessages,
      nextDeadline: nextDeadlineData
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard data'
    });
  }
});

export default router;