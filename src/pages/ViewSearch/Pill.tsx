import { ReportContext } from '@contexts/ReportContext';
import { useContext } from 'react';

export default function Pill() {
  const { showForm } = useContext(ReportContext);

  return (
    <div className="my-shadow flex w-full items-center justify-between rounded-3xl bg-white px-6 py-2 text-sm">
      <div className="flex flex-col gap-1">
        <span className="text-green-700">Obecnie jedziesz pociągiem:</span>
        <div className="grid w-full grid-cols-[30px_auto] grid-rows-3">
          <span className="px-1">z</span> <span className="font-bold">Kraków Główny (14:30) </span>
          <span className="px-1">do</span>{' '}
          <span className="font-bold">Warszawa Centralna (18:00) </span>
        </div>
        <span className="text-blue-500">IC 1002 • PKP Intercity</span>
      </div>

      <button
        onClick={showForm}
        className="aspect-square rounded-3xl bg-red-800 p-4 text-white transition-all hover:scale-105 active:scale-95"
      >
        Zgłoś
      </button>
    </div>
  );
}
