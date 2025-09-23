export interface Vehicle {
  id: string;
  name: string;
  number: string;
  imageUrl: string;
  locations: string[];
  vehicleType: string;
  calculatedPrice: number;
  calculatedIncludedKm: number;
  duration: string;
  availability: {
    [key: string]: boolean;
  };
}
