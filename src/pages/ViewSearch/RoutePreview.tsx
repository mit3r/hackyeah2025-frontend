// import { Route } from '@type/routes';
import { DetailsContext } from '@contexts/DetailsContext';
import { Route } from '@type/routes';
import { useContext } from 'react';

export default function RoutePreview() {
  const { route, setRoute } = useContext(DetailsContext);

  const handleBack = () => {
    setRoute(null);
  };

  // Get delay from route data if available
  const delayPrediction = route && route.length > 0 && route[0].delay ? route[0].delay : 0;

  // Calculate total journey info
  const totalInfo = route
    ? (() => {
        const firstSegment = route[0];
        const lastSegment = route[route.length - 1];
        const startTime = new Date(firstSegment.departureTime);
        const endTime = new Date(lastSegment.arrivalTime);

        // Check if dates are valid
        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
          return {
            from: firstSegment.departureName,
            to: lastSegment.arrivalName,
            startTime: 'N/A',
            endTime: 'N/A',
            duration: 'N/A',
            segments: route.length,
            transfers: route.length - 1,
          };
        }

        const totalDuration = endTime.getTime() - startTime.getTime();
        const totalMinutes = Math.round(totalDuration / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return {
          from: firstSegment.departureName,
          to: lastSegment.arrivalName,
          startTime: startTime.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
          endTime: endTime.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
          duration: hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`,
          segments: route.length,
          transfers: route.length - 1,
        };
      })()
    : null;

  return (
    <div className="my-shadow flex h-full w-full flex-col gap-2 overflow-y-auto rounded-3xl bg-white p-2">
      {/* Header with back button */}
      <div className="flex items-center justify-between p-2">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-medium">Wstecz</span>
        </button>

        {delayPrediction > 0 && (
          <div className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
            ⚠️ Możliwe opóźnienie: {delayPrediction} min
          </div>
        )}

        {delayPrediction === 0 && (
          <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            ✅ Na czas
          </div>
        )}
      </div>

      {/* <Switch
        onChange={(option) => setMode(option as 'trains' | 'route')}
        options={['trains', 'route']}
        labels={[t('train'), t('route')]}
        choosen={mode}
      /> */}

      {totalInfo && (
        <div className="mb-2 rounded-2xl bg-blue-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {totalInfo.from} → {totalInfo.to}
            </h2>
            <span className="text-lg font-bold text-blue-600">{totalInfo.duration}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Odjazd: {totalInfo.startTime}</span>
            <span>Przyjazd: {totalInfo.endTime}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm text-gray-600">
            <span>
              {totalInfo.segments} segment{totalInfo.segments > 1 ? 'y' : ''}
            </span>
            <span>
              {totalInfo.transfers} przesiadk
              {totalInfo.transfers === 1 ? 'a' : totalInfo.transfers > 1 ? 'i' : ''}
            </span>
          </div>
        </div>
      )}

      <div className="overflow-y-auto rounded-2xl bg-gray-50 p-4">
        {route !== null &&
          route.map((segment, index) => (
            <Segment segment={segment} key={index} end={index === route.length - 1} />
          ))}
      </div>
    </div>
  );
}

function Segment({ segment, end }: { segment: Route; end: boolean }) {
  const depTime = new Date(segment.departureTime);
  const arrTime = new Date(segment.arrivalTime);

  // Check if dates are valid
  const isValidDep = !isNaN(depTime.getTime());
  const isValidArr = !isNaN(arrTime.getTime());

  const departureTime = isValidDep
    ? depTime.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
    : 'N/A';

  const arrivalTime = isValidArr
    ? arrTime.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
    : 'N/A';

  // Calculate duration
  let durationText = 'N/A';
  if (isValidDep && isValidArr) {
    const durationMs = arrTime.getTime() - depTime.getTime();
    const durationMinutes = Math.round(durationMs / (1000 * 60));
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    durationText = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  }

  // Get delay from segment data if available
  const segmentDelay = segment.delay || 0;

  return (
    <div className="mb-4">
      {/* Departure */}
      <div className="mb-2 grid grid-cols-[20%_20px_1fr] items-center gap-1">
        <div className="text-right">
          <div className="text-lg font-bold">{departureTime}</div>
          {segmentDelay > 0 && <div className="text-xs text-orange-600">+{segmentDelay} min</div>}
        </div>
        <span className="aspect-square w-full rounded-full bg-green-500" />
        <div>
          <div className="font-semibold">{segment.departureName}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{segment.vehicle}</span>
            {segment.carrier && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                {segment.carrier}
              </span>
            )}
            {segmentDelay > 0 && (
              <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700">
                Opóźnienie
              </span>
            )}
          </div>
          {segment.trainNumber && (
            <div className="text-xs text-gray-500">Pociąg: {segment.trainNumber}</div>
          )}
        </div>
      </div>

      {/* Travel line with duration */}
      <div className="grid grid-cols-[20%_20px_1fr] items-center gap-1">
        <div className="text-right text-sm text-gray-500">{durationText}</div>
        <div className="flex justify-center">
          <svg
            className="h-8 w-4"
            viewBox="0 0 24 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12,0 v48 Z"
              stroke="#10B981"
              strokeWidth={3}
              strokeDasharray={end ? '0' : '2 4'}
            />
          </svg>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>🚂</span>
          <span>W trasie</span>
          {segment.carrier && <span className="text-xs">• {segment.carrier}</span>}
        </div>
      </div>

      {/* Arrival */}
      <div className="grid grid-cols-[20%_20px_1fr] items-center gap-1">
        <div className="text-right">
          <div className="text-lg font-bold">{arrivalTime}</div>
          {segmentDelay > 0 && <div className="text-xs text-orange-600">+{segmentDelay} min</div>}
        </div>
        <span
          className={`aspect-square w-full rounded-full ${end ? 'bg-red-500' : 'bg-orange-400'}`}
        />
        <div>
          <div className="font-semibold">{segment.arrivalName}</div>
          {!end && (
            <div className="text-sm">
              <div className="font-medium text-orange-600">🔄 Przesiadka - 15 min</div>
              <div className="text-xs text-gray-500">Czas na przejście między peronami</div>
            </div>
          )}
          {end && <div className="text-sm font-medium text-green-600">✅ Cel podróży</div>}
        </div>
      </div>
    </div>
  );
}
