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
      if (data && data.connections && Array.isArray(data.connections)) {
        setConnections(data.connections.slice(0, 10)); // Limit to 10 connections max
      } else {
        console.warn('Unexpected API response format:', data);
        setConnections([]);
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
