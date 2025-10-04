import { SearchContext } from '@contexts/SearchContext';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

// type Props = {
//   onChange?: (value: string) => void;
//   value?: string;
// };

const vehicles: string[] = ['IC 1234', 'IC 5678', 'IC 9012'];

export default function VehicleInput() {
  const [t] = useTranslation('index');

  const search = useContext(SearchContext);

  const [searching, setSearching] = useState(false);
  const handleFocus = () => setSearching(true);

  const vehiclesFiltered = vehicles.filter((vehicle) =>
    vehicle.toLowerCase().includes(search.vehicle.toLowerCase()),
  );

  return (
    <div className="my-shadow w-full rounded-3xl bg-white p-4">
      <div className="relative grid w-full grid-cols-[40px_1fr] grid-rows-[40px] items-stretch justify-center gap-1">
        <label htmlFor="search_vehicle" className="flex items-center justify-center">
          <img
            width={40}
            height={40}
            className="p-1 invert"
            src="train_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
          />
        </label>
        <div className="relative z-1002 flex w-full items-center justify-between">
          <input
            type="text"
            id="search_vehicle"
            placeholder={t('search_a_vehicle')}
            className="p-4 outline-0"
            onFocus={handleFocus}
            value={search.vehicle}
            onChange={(e) => search.setVehicle(e.target.value)}
          />

          <span className="px-2" onClick={() => search.setVehicle('')}>
            <img src="close_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" className="invert" />
          </span>

          <AnimatePresence>
            {searching && (
              <motion.ol
                key="starts"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full z-1000 flex w-full flex-col rounded-b-2xl border-2 bg-white p-2 shadow-md"
              >
                {vehiclesFiltered.map((vehicle) => (
                  <li
                    className="cursor-pointer p-2 hover:bg-gray-500"
                    onClick={() => {
                      search.setVehicle(vehicle);
                      setSearching(false);
                    }}
                    key={vehicle}
                  >
                    {vehicle}
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
