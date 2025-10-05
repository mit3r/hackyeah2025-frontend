import { createContext } from 'react';

export interface Station {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  type: number;
  type_name: string;
  platform_capacity: number;
  current_occupancy: number;
  is_at_capacity: boolean;
  created_at: string;
  updated_at: string;
}

export interface Segment {
  from_station: Station;
  to_station: Station;
  distance_km: number;
  time_minutes: number;
  max_speed_kmh: number;
}

export interface Connection {
  departure_station: Station;
  arrival_station: Station;
  segments: Segment[];
  total_distance_km: number;
  total_travel_time_minutes: number;
  stops_count: number;
  transfers_count: number;
}

export const SearchContext = createContext<{
  startLocation: string;
  setStartLocation: (location: string) => void;
  endLocation: string;
  setEndLocation: (location: string) => void;
  swapLocations?: () => void;

  vehicle: string;
  setVehicle: (vehicle: string) => void;

  // Connections state
  connections: Connection[];
  connectionsLoading: boolean;
  connectionsError: string | null;
  searchConnections: (fromStationId: number, toStationId: number) => Promise<void>;
  clearConnections: () => void;

  // UI state
  showNavbar: boolean;
  setShowNavbar: (show: boolean) => void;
}>({
  startLocation: '',
  setStartLocation: () => {},
  endLocation: '',
  setEndLocation: () => {},
  swapLocations: () => {},

  vehicle: '',
  setVehicle: () => {},

  connections: [],
  connectionsLoading: false,
  connectionsError: null,
  searchConnections: async () => {},
  clearConnections: () => {},

  showNavbar: true,
  setShowNavbar: () => {},
});
