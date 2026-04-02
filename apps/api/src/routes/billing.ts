//apps/api/src/routes/billing.ts

import { Router } from "express";
import prisma from "@repo/db"; // default import

const router = Router();

router.get("/user/:userId", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { userId: req.params.userId },
      orderBy: { createdAt: "desc" }
    });

    res.json(invoices);
  } catch (error) {
    console.error("Billing error:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

router.post("/invoice", async (req, res) => {
  try {
    const { userId, amount, status } = req.body;

    const invoice = await prisma.invoice.create({
      data: {
        userId,
        amount,
        status
      }
    });

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: "Failed to create invoice" });
  }
});

export default router;