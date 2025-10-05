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

export interface RouteInfo {
  id: number;
  name: string;
  line_number: string;
  carrier: number;
  carrier_name: string;
  vehicle: number;
  vehicle_name: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoutePoint {
  id: number;
  station: number;
  station_name: string;
  platform: number | null;
  platform_name: string | null;
  sequence: number;
  scheduled_arrival_time: string;
  scheduled_departure_time: string;
  stop_duration_minutes: number;
  distance_from_previous_km: number;
}

export interface Journey {
  id: number;
  route: number;
  route_info: RouteInfo;
  journey_date: string;
  scheduled_departure: string;
  actual_departure: string | null;
  scheduled_arrival: string;
  actual_arrival: string | null;
  status: string;
  current_delay_minutes: number;
  start_station: {
    id: number;
    name: string;
  };
  end_station: {
    id: number;
    name: string;
  };
}

export interface DirectConnection {
  route: RouteInfo;
  departure_station: Station;
  arrival_station: Station;
  departure_time: string;
  arrival_time: string;
  travel_time_minutes: number;
  distance_km: number;
  stops_count: number;
  route_points: RoutePoint[];
  next_journeys: Journey[];
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
  // Add support for direct connections
  route?: RouteInfo;
  departure_time?: string;
  arrival_time?: string;
  route_points?: RoutePoint[];
  next_journeys?: Journey[];
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
