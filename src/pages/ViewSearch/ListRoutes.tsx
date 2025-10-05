import { SearchContext } from '@contexts/SearchContext';
import { useContext, useEffect } from 'react';

import { DetailsContext } from '@contexts/DetailsContext';
import { Journey, RouteInfo, Segment, Station } from '@contexts/SearchContext/context';
import { Route } from '@type/routes';
import useStations from '../../hooks/useStations';

type Connection = {
  departure_station: Station;
  arrival_station: Station;
  route: RouteInfo;
  route_points: {
    scheduled_departure_time: string;
    scheduled_arrival_time: string;

    id: number;
    station_name: string;
    platform: string | null;
  }[];
  segments: Segment[];
};

export default function ListRoutes() {
  const search = useContext(SearchContext);
  const { setRoute } = useContext(DetailsContext);
  const { getStationByName } = useStations();
  const { connections, connectionsLoading, connectionsError } = search;

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

  const handleConnectionClick = (connection: Connection) => {
    // For direct connections, use route_points if available
    if (connection.route_points && connection.route_points.length > 0) {
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0]; // Get YYYY-MM-DD

      const routes: Route[] = connection.route_points.slice(0, -1).map(
        (
          point: {
            scheduled_departure_time: string;
            id: number;
            station_name: string;
            platform: string | null;
          },
          index: number,
        ) => {
          const nextPoint = connection.route_points[index + 1];

          const departureDateTime = `${dateStr}T${point.scheduled_departure_time}`;
          const arrivalDateTime = `${dateStr}T${nextPoint.scheduled_arrival_time}`;

          return {
            id: point.id,
            departureName: point.station_name,
            departurePosition: {
              latitude: connection.departure_station.latitude,
              longitude: connection.departure_station.longitude,
            },
            departureTime: departureDateTime,
            arrivalName: nextPoint.station_name,
            arrivalPosition: {
              latitude: connection.arrival_station.latitude,
              longitude: connection.arrival_station.longitude,
            },
            arrivalTime: arrivalDateTime,
            vehicle: connection.route
              ? `${connection.route.line_number} • ${connection.route.carrier_name}`
              : `Peron ${point.platform || 'TBA'}`,
            platform: point.platform,
            carrier: connection.route?.carrier_name || 'PKP',
            trainNumber: connection.route?.line_number || 'N/A',
            isTransfer: false,
          };
        },
      );

      setRoute(routes);
      return;
    }

    // For connections with transfers, use segments
    let currentTime = new Date();
    currentTime.setHours(8, 0, 0, 0); // Start at 8:00 AM

    const routes = connection.segments.map((segment: Segment, index: number) => {
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
          longitude: segment.from_station.longitude,
        },
        departureTime: departureTime.toISOString(),
        arrivalName: segment.to_station.name,
        arrivalPosition: {
          latitude: segment.to_station.latitude,
          longitude: segment.to_station.longitude,
        },
        arrivalTime: arrivalTime.toISOString(),
        vehicle: `Peron ${randomPlatform} • ${segment.from_station.type_name}`,
        // Add extra info for display
        platform: randomPlatform,
        carrier:
          segment.from_station.type_name === 'Dworzec kolejowy'
            ? 'PKP Intercity'
            : 'Koleje Regionalne',
        trainNumber: `IC ${Math.floor(Math.random() * 9000) + 1000}`,
        isTransfer: index > 0,
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
    <div className="my-shadow flex h-full w-full flex-col gap-5 overflow-y-auto rounded-2xl bg-white p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            search.clearConnections();
            search.setStartLocation('');
            search.setEndLocation('');
          }}
          className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-800"
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
        const isDirect = !hasTransfers && connection.route;

        return (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
            {/* Main connection info */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex flex-col">
                <div className="font-semibold">
                  {connection.departure_station.name} → {connection.arrival_station.name}
                </div>
                <div className="text-sm text-gray-600">
                  {isDirect && connection.route && (
                    <span className="font-medium text-blue-600">
                      {connection.route.line_number} • {connection.route.carrier_name}
                    </span>
                  )}
                  {!isDirect && (
                    <span>
                      {hasTransfers
                        ? `${connection.transfers_count} przesiadka${connection.transfers_count > 1 ? 'i' : ''}`
                        : 'Bezpośrednie'}{' '}
                      • {formatTime(connection.total_travel_time_minutes)}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{connection.total_distance_km}km</div>
                {isDirect && (
                  <div className="text-xs text-gray-500">
                    {formatTime(connection.total_travel_time_minutes)}
                  </div>
                )}
              </div>
            </div>

            {/* Show next journeys for direct connections */}
            {isDirect && connection.next_journeys && connection.next_journeys.length > 0 && (
              <div className="space-y-2">
                {connection.next_journeys.map((journey: Journey) => {
                  const departureDate = new Date(journey.scheduled_departure);
                  const arrivalDate = new Date(journey.scheduled_arrival);
                  const hasDelay = journey.current_delay_minutes > 0;

                  const handleJourneyClick = () => {
                    // Create route using journey times instead of connection times
                    const routes = [
                      {
                        id: journey.id,
                        departureName: connection.departure_station.name,
                        departurePosition: {
                          latitude: connection.departure_station.latitude,
                          longitude: connection.departure_station.longitude,
                        },
                        departureTime: journey.scheduled_departure,
                        arrivalName: connection.arrival_station.name,
                        arrivalPosition: {
                          latitude: connection.arrival_station.latitude,
                          longitude: connection.arrival_station.longitude,
                        },
                        arrivalTime: journey.scheduled_arrival,
                        vehicle: connection.route
                          ? `${connection.route.line_number} • ${connection.route.carrier_name}`
                          : 'Pociąg',
                        platform: null,
                        carrier: connection.route?.carrier_name || 'PKP',
                        trainNumber: connection.route?.line_number || 'N/A',
                        isTransfer: false,
                        delay: hasDelay ? journey.current_delay_minutes : 0,
                      },
                    ];
                    setRoute(routes);
                  };

                  return (
                    <div
                      key={journey.id}
                      className="cursor-pointer rounded-lg border border-gray-100 p-2 transition-colors hover:bg-gray-50"
                      onClick={handleJourneyClick}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium">
                            {departureDate.toLocaleTimeString('pl-PL', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                            {' → '}
                            {arrivalDate.toLocaleTimeString('pl-PL', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                          {hasDelay && (
                            <div className="text-xs text-orange-600">
                              Opóźnienie: {journey.current_delay_minutes} min
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-green-600">
                          {journey.status === 'SCHEDULED' ? 'Zaplanowane' : journey.status}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Show segments for transfers */}
            {hasTransfers && (
              <div
                className="mt-3 cursor-pointer rounded-lg border-t p-2 pt-3 transition-colors hover:bg-gray-50"
                onClick={() => handleConnectionClick(connection as Connection)}
              >
                <div className="mb-2 text-sm font-medium text-gray-700">Trasa z przesiadkami:</div>
                <div className="grid grid-cols-1 gap-1 text-xs text-gray-600">
                  {connection.segments.map((segment: Segment, segIndex: number) => (
                    <div key={segIndex} className="flex justify-between">
                      <span>
                        {segment.from_station.name} → {segment.to_station.name}
                      </span>
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
