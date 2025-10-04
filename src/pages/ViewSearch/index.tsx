import { TabContext } from '@contexts/TabContext';
import EraseButton from '@pages/ViewSearch/EraseButton';
import OurMap from '@pages/ViewSearch/OurMap';
import RouteInput from '@pages/ViewSearch/RouteInput';
import TimeInput from '@pages/ViewSearch/TimeInput';
import VehicleInput from '@pages/ViewSearch/VehicleInput';
import { AnimatePresence, motion } from 'motion/react';
import { useContext } from 'react';
import ListRoute from './ListRoute';

export default function ViewSearch() {
  const { tab } = useContext(TabContext);
  // const { startLocation, endLocation } = useContext(SearchContext);

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

      {/* <AnimatePresence>
        {startLocation !== '' && endLocation !== '' && (
          <motion.div
            className="w-full"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <ListRoutes />
          </motion.div>
        )}
      </AnimatePresence> */}

      <AnimatePresence>
        {
          <motion.div className="w-full">
            <ListRoute />
          </motion.div>
        }
      </AnimatePresence>

      {/* Map */}
      <motion.div className="h-full w-full rounded-2xl bg-white p-2">
        <OurMap className="h-full w-full flex-1 rounded-2xl" />
      </motion.div>
    </>
  );
}
