//packages/api-client/src/consultingClient.ts

import { Booking } from "@repo/types";

// ✅ Use environment variable with fallback for local development
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchBookings(userId: string): Promise<Booking[]> {
  const res = await fetch(`${BASE_URL}/api/consulting/${userId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch bookings: ${res.statusText}`);
  }

  const data = await res.json();
  
  if (!Array.isArray(data)) {
    throw new Error("Invalid response format");
  }
  
  return data;
}