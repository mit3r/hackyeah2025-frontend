import { useEffect, useState, useCallback } from 'react';
import { Station } from '../contexts/SearchContext/context';
export default function useStations() {
  const [stations, setStations] = useState<string[]>([]);
  const [allStations, setAllStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/stations/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        
        const data: Station[] = await response.json();
        setAllStations(data);
        const stationNames = data.map((station) => station.name);
        setStations(stationNames);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stations');
        console.error('Error fetching stations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const filterStations = useCallback((query: string): Station[] => {
    if (!query.trim()) {
      return allStations
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 5);
    }
    
    return allStations
      .filter((station) => 
        station.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5); 
  }, [allStations]);

  const getStationByName = useCallback((name: string): Station | undefined => {
    return allStations.find(station => station.name === name);
  }, [allStations]);

  return { 
    stations, 
    allStations,
    filterStations, 
    getStationByName,
    loading, 
    error 
  };
}