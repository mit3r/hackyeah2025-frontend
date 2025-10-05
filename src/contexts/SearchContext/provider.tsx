import { useState, useCallback } from 'react';
import { SearchContext, Connection } from './context';

export default function SearchProvider(props: { children: React.ReactNode }) {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [vehicle, setVehicle] = useState<string>('');

  // Connections state
  const [connections, setConnections] = useState<Connection[]>([]);
  const [connectionsLoading, setConnectionsLoading] = useState<boolean>(false);
  const [connectionsError, setConnectionsError] = useState<string | null>(null);

  // UI state
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  const swapLocations = () => {
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
  };

  const searchConnections = useCallback(async (fromStationId: number, toStationId: number) => {
    try {
      setConnectionsLoading(true);
      setConnectionsError(null);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/connections/?from_station=${fromStationId}&to_station=${toStationId}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch connections');
      }

      const data = await response.json();

      console.log('API Response:', data);

      // Extract connections from the response
      const allConnections: Connection[] = [];

      // Process direct connections
      if (data.direct_connections && Array.isArray(data.direct_connections)) {
        const directConnections = data.direct_connections.map((dc: any) => ({
          departure_station: dc.departure_station,
          arrival_station: dc.arrival_station,
          segments: [
            {
              from_station: dc.departure_station,
              to_station: dc.arrival_station,
              distance_km: dc.distance_km,
              time_minutes: dc.travel_time_minutes,
              max_speed_kmh: 0,
            },
          ],
          total_distance_km: dc.distance_km,
          total_travel_time_minutes: dc.travel_time_minutes,
          stops_count: dc.stops_count,
          transfers_count: 0,
          route: dc.route,
          departure_time: dc.departure_time,
          arrival_time: dc.arrival_time,
          route_points: dc.route_points,
          next_journeys: dc.next_journeys,
        }));
        allConnections.push(...directConnections);
      }

      // Process connections with transfers
      if (data.connections_with_transfers && Array.isArray(data.connections_with_transfers)) {
        allConnections.push(...data.connections_with_transfers);
      }

      console.log('Processed connections:', allConnections);
      setConnections(allConnections.slice(0, 10)); // Limit to 10 connections max

      if (allConnections.length === 0) {
        console.warn('No connections found in API response');
      }
    } catch (err) {
      setConnectionsError(err instanceof Error ? err.message : 'Failed to fetch connections');
      console.error('Error fetching connections:', err);
    } finally {
      setConnectionsLoading(false);
    }
  }, []);

  const clearConnections = useCallback(() => {
    setConnections([]);
    setConnectionsError(null);
    setShowNavbar(true);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        startLocation,
        setStartLocation,
        endLocation,
        setEndLocation,
        swapLocations,
        vehicle,
        setVehicle,
        connections,
        connectionsLoading,
        connectionsError,
        searchConnections,
        clearConnections,
        showNavbar,
        setShowNavbar,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
