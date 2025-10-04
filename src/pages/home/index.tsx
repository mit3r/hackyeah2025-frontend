import { motion } from 'motion/react';
import EraseButton from './EraseButton';
import Navbar from './Navbar';
import RouteInput from './RouteInput';
import RouteView from './RouteView';
import TimeInput from './TimeInput';
import { useContext } from 'react';
import { TabContext } from '@contexts/TabContext';
import VehicleInput from './VehicleInput';
import { AnimatePresence } from 'motion/react';

// import i18n from "@utils/translation";
// i18n.changeLanguage("")

export default function HomePage() {
  const { tab } = useContext(TabContext);

  return (
    <div className="my-circ-grad relative mx-auto flex h-svh max-w-xl flex-col items-center justify-center gap-3 p-3">
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

      {/* Map */}
      <motion.div className="h-full w-full rounded-2xl bg-white p-2">
        <RouteView className="h-full w-full flex-1 rounded-2xl" />
      </motion.div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
}
