import { SearchContext } from '@contexts/SearchContext';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

const starts = [
  'Poznań Główny',
  'Kraków Główny',
  'Warszawa Centralna',
  'Wrocław Główny',
  'Gdańsk Główny',
];

const ends = [...starts];

export default function RouteInput() {
  const [t] = useTranslation('index');

  const search = useContext(SearchContext);

  const [startFocus, setStartFocus] = useState(false);
  const startsFiltered = starts.filter((start) =>
    start.toLowerCase().includes(search.startLocation.toLowerCase()),
  );

  const [endFocus, setEndFocus] = useState(false);
  const endsFiltered = ends.filter((end) =>
    end.toLowerCase().includes(search.endLocation.toLowerCase()),
  );

  return (
    <div className="my-shadow w-full rounded-3xl bg-white p-4">
      <div className="relative grid w-full grid-cols-[40px_1fr] grid-rows-[40px_1px_40px] items-stretch justify-center gap-1">
        {/* Start Location */}
        <label htmlFor="start_location">
          <img
            width={40}
            height={40}
            className="p-1 invert"
            src="near_me_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
          />
        </label>
        <div className="relative z-1010 flex w-full items-center justify-between">
          <input
            type="text"
            id="start_location"
            placeholder={t('your_location')}
            className="p-4 outline-0"
            onFocus={() => {
              setStartFocus(true);
              setEndFocus(false);
            }}
            value={search.startLocation}
            onChange={(e) => search.setStartLocation(e.target.value)}
          />

          <span className="px-2" onClick={() => search.setStartLocation('')}>
            <img src="close_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" className="invert" />
          </span>

          <AnimatePresence>
            {startFocus && (
              <motion.ol
                key="starts"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full z-1011 flex w-full flex-col rounded-b-2xl border-2 bg-white p-2 shadow-md"
              >
                {startsFiltered.map((start) => (
                  <li
                    className="cursor-pointer p-2 hover:bg-gray-500"
                    onClick={() => {
                      search.setStartLocation(start);
                      setStartFocus(false);
                    }}
                    key={start}
                  >
                    {start}
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>

        <div className="col-start-2 flex items-center justify-center bg-gray-300" />

        {/* End Location */}
        <label htmlFor="end_location" className="flex items-center justify-center">
          <img
            width={40}
            height={40}
            className="p-1 invert"
            src="location_on_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
          />
        </label>
        <div className="relative z-1001 flex w-full items-center justify-between">
          <input
            type="text"
            id="start_location"
            placeholder={t('destination_location')}
            className="p-4 outline-0"
            onFocus={() => {
              setEndFocus(true);
              setStartFocus(false);
            }}
            value={search.endLocation}
            onChange={(e) => search.setEndLocation(e.target.value)}
          />

          <span className="px-2" onClick={() => search.setEndLocation('')}>
            <img src="close_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" className="invert" />
          </span>

          <AnimatePresence>
            {endFocus && (
              <motion.ol
                key="ends"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full z-1000 flex w-full flex-col rounded-b-2xl border-2 bg-white p-2 shadow-md"
              >
                {endsFiltered.map((end) => (
                  <li
                    className="cursor-pointer p-2 hover:bg-gray-500"
                    onClick={() => {
                      search.setEndLocation(end);
                      setEndFocus(false);
                    }}
                    key={end}
                  >
                    {end}
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>

        {/* Strokes line */}
        <div className="absolute top-[35px] left-[20px]">
          <svg width={30} height={30} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 v24" fill="none" stroke="black" strokeWidth={4} strokeDasharray={'3'} />
          </svg>
        </div>
      </div>
    </div>
  );
}
