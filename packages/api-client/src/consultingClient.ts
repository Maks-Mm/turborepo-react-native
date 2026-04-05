//packages/api-client/src/consultingClient.ts

import { Booking } from "@repo/types";

const BASE_URL = "http://localhost:3001";

export async function fetchBookings(userId: string): Promise<Booking[]> {
  const res = await fetch(`${BASE_URL}/api/consulting/${userId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch bookings: ${res.statusText}`);
  }

  const data = await res.json();
  
  // Validate that each booking has address
  if (!Array.isArray(data)) {
    throw new Error("Invalid response format");
  }
  
  return data;
}