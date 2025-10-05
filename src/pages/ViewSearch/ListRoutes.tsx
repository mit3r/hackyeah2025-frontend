import { DetailsContext } from '@contexts/DetailsContext';
import { Route } from '@type/routes';
import { useContext } from 'react';

const routes: Route[][] = [
  [
    {
      id: 1,
      departureName: 'Poznań Główny',
      departurePosition: { latitude: 0, longitude: 0 },
      departureTime: '2025-10-04T20:05:00',
      arrivalName: 'Jaworzno',
      arrivalPosition: { latitude: 0, longitude: 0 },
      arrivalTime: '2025-10-04T23:59:00',
      vehicle: 'IC 1234',
    },
    {
      id: 2,
      departureName: 'Jaworzno',
      departurePosition: { latitude: 0, longitude: 0 },
      departureTime: '2025-10-05T01:02:00',
      arrivalName: 'Kraków Główny',
      arrivalPosition: { latitude: 0, longitude: 0 },
      arrivalTime: '2025-10-05T05:00:00',
      vehicle: 'IC 5678',
    },
    {
      id: 3,
      departureName: 'Jaworzno',
      departurePosition: { latitude: 0, longitude: 0 },
      departureTime: '2025-10-05T01:02:00',
      arrivalName: 'Kraków Główny',
      arrivalPosition: { latitude: 0, longitude: 0 },
      arrivalTime: '2025-10-05T05:00:00',
      vehicle: 'IC 5678',
    },

    {
      id: 4,
      departureName: 'Kraków Główny',
      departurePosition: { latitude: 0, longitude: 0 },
      departureTime: '2025-10-05T01:02:00',
      arrivalName: 'Kraków Główny',
      arrivalPosition: { latitude: 0, longitude: 0 },
      arrivalTime: '2025-10-05T05:00:00',
      vehicle: 'IC 5678',
    },
  ],
  [
    {
      id: 3,
      departureName: 'Kraków Główny',
      departurePosition: { latitude: 0, longitude: 0 },
      departureTime: '2025-10-04T20:05:00',
      arrivalName: 'Warszawa Centralna',
      arrivalPosition: { latitude: 0, longitude: 0 },
      arrivalTime: '2025-10-04T23:59:00',
      vehicle: 'IC 4321',
    },
  ],
];

export default function ListRoutes() {
  return (
    <div className="my-shadow flex h-[calc(100%-7rem)] w-full flex-col gap-5 overflow-y-auto rounded-2xl bg-white p-4">
      <h2 className="text-center text-xl">Available routes</h2>

      {routes.map((route, i) => (
        <ListRouteItem key={i} route={route} />
      ))}
    </div>
  );
}

function ListRouteItem({ route }: { route: Route[] }) {
  const { setRoute } = useContext(DetailsContext);

  const depTime = new Date(route.at(0)?.departureTime ?? '');
  const arrTime = new Date(route.at(-1)?.arrivalTime ?? '');

  return (
    <button
      className="my-shadow w-full overflow-y-auto rounded-2xl bg-neutral-300 p-4 transition-all hover:scale-105 active:scale-95"
      key={route[0].id}
      onClick={() => setRoute(route)}
    >
      <div className="flex w-full justify-between">
        <h3 className="font-bold">za 50 min</h3>{' '}
        <span>{route.map((r) => r.vehicle).join(', ')}</span>
      </div>
      <div className="flex w-full items-center justify-between">
        <h4 className="text-2xl">{depTime.toLocaleTimeString().slice(0, 5)}</h4>
        {/* <span>{'<->'}</span> */}

        <svg className="my-2 h-2 w-full" viewBox="0 0 300 24">
          <path d="M0,12 h300 Z" stroke="blue" strokeWidth={4} strokeDasharray={2} />
        </svg>

        <h4 className="text-2xl">{arrTime.toLocaleTimeString().slice(0, 5)}</h4>
      </div>
      <div className="flex w-full justify-between">
        <h4 className="text-gray-500">{route.at(0)?.departureName.slice(0, 15)}</h4>
        <span>🚶‍➡️</span>
        <h4 className="text-gray-500">{route.at(-1)?.arrivalName.slice(0, 15)}</h4>
      </div>
    </button>
  );
}
