export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  dateOfBirth?: string | null;
  licenseNumber?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  bookings: Booking[];
};

export interface VehicleLocation {
  location: string;
}

export interface Vehicle {
  id: string;
  name: string;
  number: string;
  pricePerDay: string; // Decimal as string
  totalPriceFor2Days: string; // Decimal as string
  includedKmPerDay: number;
  includedKmFor2Days: number;
  locations: VehicleLocation[];
  vehicleType: BookingVehicle;
}

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED";

export interface Booking {
  id: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  startTime: string;
  endTime: string;
  location: string;
  totalPrice: string; // Decimal as string
  status: BookingStatus;
  vehicle: Vehicle;
}

export type BookingVehicle = {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
};

export type UserBooking = {
  id: string;
  vehicle: BookingVehicle;
  location: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endDate: string; // YYYY-MM-DD
  endTime: string; // HH:mm
  totalPrice: number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "ACTIVE"
    | "COMPLETED"
    | "CANCELLED"
    | "REFUNDED";
};

export type GetUserBookingsResponse = {
  data: UserBooking[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};
