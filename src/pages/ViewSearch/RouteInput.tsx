import { SearchContext } from '@contexts/SearchContext';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useStations from '../../hooks/useStations';

export default function RouteInput() {
  const [t] = useTranslation('index');
  const {
    startLocation,
    setStartLocation,
    endLocation,
    setEndLocation,
    searchConnections,
    clearConnections,
  } = useContext(SearchContext);
  const { filterStations, getStationByName, loading, error } = useStations();

  const [startFocus, setStartFocus] = useState(false);
  const [endFocus, setEndFocus] = useState(false);

  const startsFiltered = filterStations(startLocation);
  const endsFiltered = filterStations(endLocation);

  // Search for connections when both stations are selected
  useEffect(() => {
    const startStation = getStationByName(startLocation);
    const endStation = getStationByName(endLocation);

    if (startStation && endStation && startStation.id !== endStation.id) {
      searchConnections(startStation.id, endStation.id);
    } else if (startLocation || endLocation) {
      // Only clear if there are some inputs but invalid combination
      clearConnections();
    }
  }, [getStationByName, startLocation, endLocation, searchConnections, clearConnections]);

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
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          />

          <span
            className="px-2"
            onClick={() => {
              setStartLocation('');
              setStartFocus(false);
            }}
          >
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
                {loading ? (
                  <li className="p-2 text-gray-500">Loading...</li>
                ) : error ? (
                  <li className="p-2 text-red-500">Error loading stations</li>
                ) : startsFiltered.length === 0 ? (
                  <li className="p-2 text-gray-500">No results</li>
                ) : (
                  startsFiltered.map((start) => (
                    <li
                      className="cursor-pointer p-2 hover:bg-gray-500"
                      onClick={() => {
                        setStartLocation(start.name);
                        setStartFocus(false);
                      }}
                      key={start.id}
                    >
                      {start.name}
                    </li>
                  ))
                )}
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
            value={endLocation}
            onChange={(e) => {
              setEndLocation(e.target.value);
            }}
          />

          <span
            className="px-2"
            onClick={() => {
              setEndLocation('');
              setEndFocus(false);
            }}
          >
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
                {loading ? (
                  <li className="p-2 text-gray-500">Loading...</li>
                ) : error ? (
                  <li className="p-2 text-red-500">Error loading stations</li>
                ) : endsFiltered.length === 0 ? (
                  <li className="p-2 text-gray-500">No results</li>
                ) : (
                  endsFiltered.map((end) => (
                    <li
                      className="cursor-pointer p-2 hover:bg-gray-500"
                      onClick={() => {
                        setEndLocation(end.name);
                        setEndFocus(false);
                      }}
                      key={end.id}
                    >
                      {end.name}
                    </li>
                  ))
                )}
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
