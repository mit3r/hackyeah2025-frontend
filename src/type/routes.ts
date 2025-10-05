export type Position = {
  latitude: number;
  longitude: number;
};

export interface Route {
  id: number;

  delay?: number; // delay in minutes, optional
  carrier: string;
  trainNumber?: string;

  arrivalName: string;
  arrivalPosition: Position;
  arrivalTime: string;

  departureName: string;
  departurePosition: Position;
  departureTime: string;

  vehicle: string;
}
