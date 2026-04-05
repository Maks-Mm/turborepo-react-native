//packages/types/src/consulting.ts

 export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

export interface Address {
  fullAddress: string;
  lat?: number;
  lng?: number;
}

export interface Booking {
  id: string;
  consultantName: string;
  date: string;
  status: BookingStatus;
  notes?: string;

  // REQUIRED
  address: Address;
}