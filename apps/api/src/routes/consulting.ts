// apps/api/src/routes/consulting.ts

import { Router } from "express";

const router = Router();

// Rich mock data matching the HTML example
const MOCK_BOOKINGS = [
  {
    id: "b1",
    consultantName: "Dr. Schmidt",
    userId: "user-123",
    date: "2026-04-15T10:30:00Z",
    status: "confirmed",
    notes: "Initial consultation, bring previous reports",
    address: {
      fullAddress: "Alexanderplatz 1, 10178 Berlin, Germany",
      street: "Alexanderplatz 1",
      city: "Berlin",
      postalCode: "10178",
      country: "Germany",
      lat: 52.5218,
      lng: 13.4133
    }
  },
  {
    id: "b2",
    consultantName: "Dr. Weber",
    userId: "user-123",
    date: "2026-04-18T14:15:00Z",
    status: "pending",
    notes: "Strategy session for digital transformation",
    address: {
      fullAddress: "Neuhauser Str. 8, 80331 Munich, Germany",
      street: "Neuhauser Str. 8",
      city: "Munich",
      postalCode: "80331",
      country: "Germany"
    }
  },
  {
    id: "b3",
    consultantName: "Prof. Hoffmann",
    userId: "user-123",
    date: "2026-04-22T09:00:00Z",
    status: "completed",
    notes: "Annual review completed",
    address: {
      fullAddress: "Speersort 1, 20095 Hamburg, Germany",
      street: "Speersort 1",
      city: "Hamburg",
      postalCode: "20095",
      country: "Germany"
    }
  },
  {
    id: "b4",
    consultantName: "Dr. Chen",
    userId: "user-123",
    date: "2026-05-02T11:45:00Z",
    status: "cancelled",
    notes: "Client requested reschedule",
    address: {
      fullAddress: "Kaiserstraße 46, 60329 Frankfurt am Main, Germany",
      street: "Kaiserstraße 46",
      city: "Frankfurt",
      postalCode: "60329",
      country: "Germany"
    }
  },
  {
    id: "b5",
    consultantName: "Ms. Kovac",
    userId: "user-123",
    date: "2026-05-10T15:30:00Z",
    status: "pending",
    notes: "Corporate consulting package kickoff",
    address: {
      fullAddress: "Schildergasse 65, 50667 Cologne, Germany",
      street: "Schildergasse 65",
      city: "Cologne",
      postalCode: "50667",
      country: "Germany"
    }
  },
  {
    id: "b6",
    consultantName: "Dr. Schmidt",
    userId: "user-123",
    date: "2026-05-20T09:00:00Z",
    status: "confirmed",
    notes: "Follow-up: medication review",
    address: {
      fullAddress: "Alexanderplatz 1, 10178 Berlin, Germany",
      street: "Alexanderplatz 1",
      city: "Berlin",
      postalCode: "10178",
      country: "Germany"
    }
  }
];

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  
  // Filter bookings by userId (in real app, this would be a database query)
  const userBookings = MOCK_BOOKINGS.filter(booking => booking.userId === userId);
  
  res.json(userBookings);
});

router.post("/", async (req, res) => {
  const { consultantName, date, notes, address, userId } = req.body;
  
  const newBooking = {
    id: `b${Date.now()}`,
    consultantName,
    userId,
    date,
    status: "pending" as const,
    notes: notes || "",
    address
  };
  
  // In real app, save to database
  MOCK_BOOKINGS.push(newBooking);
  
  res.status(201).json(newBooking);
});

export default router;