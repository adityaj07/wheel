export interface BookingResponse {
  id: string;
  vehicle: {
    id: string;
    name: string;
    imageUrl: string;
    type: "Bike" | "Scooter";
  };
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  totalPrice: number;
  createdAt: Date;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "ACTIVE"
    | "COMPLETED"
    | "CANCELLED"
    | "REFUNDED";
}

export interface BookingListResponse {
  data: BookingResponse[];
}
