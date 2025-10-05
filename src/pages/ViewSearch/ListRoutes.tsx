import { useContext, useEffect } from 'react';
import { SearchContext } from '@contexts/SearchContext';
import { DetailsContext } from '@contexts/DetailsContext';
import useStations from '../../hooks/useStations';

export default function ListRoutes() {
  const search = useContext(SearchContext);
  const { setRoute } = useContext(DetailsContext);
  const { getStationByName } = useStations();
  const { 
    connections, 
    connectionsLoading, 
    connectionsError
  } = search;

  useEffect(() => {
    if (connections.length > 0) {
      search.setShowNavbar(false);
    }
  }, [connections.length, search]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const handleConnectionClick = (connection: any) => {
    // Calculate estimated times based on segments
    let currentTime = new Date();
    currentTime.setHours(8, 0, 0, 0); // Start at 8:00 AM
    
    const routes = connection.segments.map((segment: any, index: number) => {
      const departureTime = new Date(currentTime);
      
      // Add travel time for this segment
      const arrivalTime = new Date(currentTime.getTime() + segment.time_minutes * 60000);
      
      // Generate random platform number
      const randomPlatform = Math.floor(Math.random() * 12) + 1;
      
      const route = {
        id: index + 1,
        departureName: segment.from_station.name,
        departurePosition: {
          latitude: segment.from_station.latitude,
          longitude: segment.from_station.longitude
        },
        departureTime: departureTime.toISOString(),
        arrivalName: segment.to_station.name,
        arrivalPosition: {
          latitude: segment.to_station.latitude,
          longitude: segment.to_station.longitude
        },
        arrivalTime: arrivalTime.toISOString(),
        vehicle: `Peron ${randomPlatform} • ${segment.from_station.type_name}`,
        // Add extra info for display
        platform: randomPlatform,
        carrier: segment.from_station.type_name === 'Dworzec kolejowy' ? 'PKP Intercity' : 'Koleje Regionalne',
        trainNumber: `IC ${Math.floor(Math.random() * 9000) + 1000}`,
        isTransfer: index > 0
      };
      
      // Next segment starts 15 minutes after arrival (transfer time)
      currentTime = new Date(arrivalTime.getTime() + 15 * 60000);
      
      return route;
    });
    
    setRoute(routes);
  };

  if (connectionsLoading) {
    return (
      <div className="my-shadow flex w-full flex-col gap-5 rounded-2xl bg-white p-4">
        <h2 className="text-center text-xl">Dostępne połączenia</h2>
        <p className="text-center text-gray-500">Ładowanie...</p>
      </div>
    );
  }

  if (connectionsError) {
    return (
      <div className="my-shadow flex w-full flex-col gap-5 rounded-2xl bg-white p-4">
        <h2 className="text-center text-xl">Dostępne połączenia</h2>
        <p className="text-center text-red-500">Błąd: {connectionsError}</p>
      </div>
    );
  }

  if (connections.length === 0) {
    const startStation = getStationByName(search.startLocation);
    const endStation = getStationByName(search.endLocation);
    
    if (!startStation || !endStation) {
      return (
        <div className="my-shadow flex w-full flex-col gap-5 rounded-2xl bg-white p-4">
          <h2 className="text-center text-xl">Dostępne połączenia</h2>
          <p className="text-center text-gray-500">Wybierz stację początkową i końcową</p>
        </div>
      );
    }

    return (
      <div className="my-shadow flex w-full flex-col gap-5 rounded-2xl bg-white p-4">
        <h2 className="text-center text-xl">Dostępne połączenia</h2>
        <p className="text-center text-gray-500">Brak dostępnych połączeń</p>
      </div>
    );
  }

  return (
    <div className="my-shadow flex w-full overflow-y-auto h-svh flex-col gap-5 rounded-2xl bg-white p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            search.clearConnections();
            search.setStartLocation('');
            search.setEndLocation('');
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <img
            width={24}
            height={24}
            className="invert"
            src="undo_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt="Wstecz"
          />
        </button>
        <h2 className="text-xl">Dostępne połączenia</h2>
        <div className="w-16"></div>
      </div>

      {connections.map((connection, index) => {
        const hasTransfers = connection.transfers_count > 0;
        
        return (
          <div 
            key={index} 
            className="border-b border-gray-200 pb-4 last:border-b-0 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
            onClick={() => handleConnectionClick(connection)}
          >
            {/* Main connection info */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="font-semibold">
                  {connection.departure_station.name} → {connection.arrival_station.name}
                </div>
                <div className="text-sm text-gray-600">
                  {hasTransfers ? `${connection.transfers_count} przesiadka${connection.transfers_count > 1 ? 'i' : ''}` : 'Bezpośrednie'} • {formatTime(connection.total_travel_time_minutes)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{connection.total_distance_km}km</div>
                <div className="text-xs text-green-600">Dostępne</div>
              </div>
            </div>

            {/* Show segments for transfers */}
            {hasTransfers && (
              <div className="mt-3 border-t pt-3">
                <div className="text-sm font-medium text-gray-700 mb-2">Trasa z przesiadkami:</div>
                <div className="grid grid-cols-1 gap-1 text-xs text-gray-600">
                  {connection.segments.map((segment: any, segIndex: number) => (
                    <div key={segIndex} className="flex justify-between">
                      <span>{segment.from_station.name} → {segment.to_station.name}</span>
                      <span>{formatTime(segment.time_minutes)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
