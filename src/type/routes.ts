export type Position = {
  latitude: number;
  longitude: number;
};

export interface Route {
  id: number;

  arrivalName: string;
  arrivalPosition: Position;
  arrivalTime: string;

  departureName: string;
  departurePosition: Position;
  departureTime: string;

  vehicle: string;
}
