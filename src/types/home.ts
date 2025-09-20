export interface BikeModel {
  id: string;
  name: string;
  imageUrl: string;
  category?: string;
}

export interface BookingData {
  pickupDate: string | null;
  pickupTime: string | null;
  dropoffDate: string | null;
  dropoffTime: string | null;
}

export interface TimeSlot {
  value: string;
  label: string;
  disabled?: boolean;
}
