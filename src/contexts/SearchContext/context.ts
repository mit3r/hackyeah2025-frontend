import { createContext } from 'react';

export const SearchContext = createContext<{
  startLocation: string;
  setStartLocation: (location: string) => void;
  endLocation: string;
  setEndLocation: (location: string) => void;
  swapLocations?: () => void;

  vehicle: string;
  setVehicle: (vehicle: string) => void;
}>({
  startLocation: '',
  setStartLocation: () => {},
  endLocation: '',
  setEndLocation: () => {},
  swapLocations: () => {},

  vehicle: '',
  setVehicle: () => {},
});
