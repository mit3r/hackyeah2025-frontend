// import { Route } from '@type/routes';
import { useContext, useState } from 'react';
import Switch from './Switch';
import { useTranslation } from 'react-i18next';
import { DetailsContext } from '@contexts/DetailsContext';
import { Route } from '@type/routes';
import clsx from 'clsx';

export default function RoutePreview() {
  const [t] = useTranslation('index');
  const [mode, setMode] = useState<'trains' | 'route'>('route');
  const { route } = useContext(DetailsContext);

  return (
    <div className="flex h-[calc(100%-7rem)] w-full flex-col gap-2 rounded-3xl bg-white p-2">
      <Switch
        onChange={(option) => setMode(option as 'trains' | 'route')}
        options={['trains', 'route']}
        labels={[t('train'), t('route')]}
        choosen={mode}
      />

      <div className="rounded-2xl bg-gray-200 p-2">
        {route !== null &&
          route.map((segment, index) => (
            <Segment segment={segment} key={index} end={index % 2 === 1} />
          ))}
      </div>
    </div>
  );
}

function Segment({ segment, end }: { segment: Route; end: boolean }) {
  const departureTime = new Date(segment.departureTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // const arrivalTime = new Date(segment.arrivalTime).toLocaleTimeString([], {
  //   hour: '2-digit',
  //   minute: '2-digit',
  // });

  return (
    <div
      className="grid grid-cols-[20%_20px_1fr]"
      style={{
        alignItems: 'center',
        alignContent: 'center',
        columnGap: '5px',
      }}
    >
      <h3 className="font-bold">{departureTime}</h3>
      <span
        className={clsx('aspect-square w-full rounded-full', {
          'bg-amber-400': !end,
          'bg-gray-400': end,
        })}
      />
      <h3>{segment.departureName}</h3>

      <svg
        className="col-start-2 h-8 w-4"
        viewBox="0 0 24 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12,0 v48 Z"
          stroke="#AAAAAA"
          strokeWidth={4}
          strokeDasharray={end ? '2 4 0' : '0'}
        />
      </svg>
    </div>
  );
}
