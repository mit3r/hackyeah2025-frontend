import { TabContext } from '@contexts/TabContext';
import EraseButton from '@pages/ViewSearch/EraseButton';
import OurMap from '@pages/ViewSearch/OurMap';
import RouteInput from '@pages/ViewSearch/RouteInput';
import TimeInput from '@pages/ViewSearch/TimeInput';
import VehicleInput from '@pages/ViewSearch/VehicleInput';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useMemo } from 'react';
import RoutePreview from './RoutePreview';
import { SearchContext } from '@contexts/SearchContext';
import ListRoutes from './ListRoutes';
import { DetailsContext } from '@contexts/DetailsContext';

export default function ViewSearch() {
  const { tab } = useContext(TabContext);
  const { startLocation, endLocation } = useContext(SearchContext);
  const { route } = useContext(DetailsContext);

  const searched =
    startLocation !== '' &&
    endLocation !== '' &&
    (tab === 'searchRoute' || tab === 'searchVehicle');

  const showRoutesList = useMemo(() => searched && route === null, [searched, route]);

  const showRoutePreview = useMemo(() => searched && route !== null, [searched, route]);

  const showMap = useMemo(
    () =>
      (tab === 'searchRoute' || tab === 'searchVehicle') &&
      (startLocation === '' || endLocation === ''),
    [tab, startLocation, endLocation],
  );

  return (
    <>
      {/* Search bar */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          className="w-full"
          key={tab}
          initial={{ height: '0rem' }}
          animate={{ height: 'auto' }}
          exit={{ height: '0rem' }}
        >
          {tab === 'searchRoute' && (
            <motion.div
              layout
              className="w-full"
              key="routeInput"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <RouteInput />
            </motion.div>
          )}

          {tab === 'searchVehicle' && (
            <motion.div
              layout
              className="w-full"
              key="vehicleInput"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <VehicleInput />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {(tab === 'searchRoute' || tab === 'searchVehicle') && (
        <motion.div
          layout
          className="flex w-full justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <TimeInput />
          <EraseButton />
        </motion.div>
      )}

      <AnimatePresence>
        {showRoutesList && (
          <motion.div
            key="routesList"
            className="w-full flex-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ListRoutes />
          </motion.div>
        )}

        {showRoutePreview && (
          <motion.div
            key="routePreview"
            className="w-full flex-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <RoutePreview />
          </motion.div>
        )}

        {/* Map */}
        {showMap && (
          <motion.div
            key="map"
            className="h-full w-full rounded-2xl bg-white p-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <OurMap className="h-full w-full flex-1 rounded-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
