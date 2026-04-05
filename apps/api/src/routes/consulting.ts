// apps/api/src/routes/consulting.ts


import { Router } from "express";

const router = Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  // TEMP MOCK DATA
  const bookings = [
    {
      id: "1",
      consultantName: "Dr. Schmidt",
      date: new Date().toISOString(),
      status: "confirmed",
      notes: "Bring documents",
      address: {
        fullAddress: "Berlin, Alexanderplatz 1"
      }
    },
    {
      id: "2",
      consultantName: "Anna Kowalska",
      date: new Date().toISOString(),
      status: "pending",
      notes: "",
      address: {
        fullAddress: "Warsaw, Marszałkowska 10"
      }
    }
  ];

  res.json(bookings);
});

export default router;