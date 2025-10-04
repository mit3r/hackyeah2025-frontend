import { motion } from 'motion/react';
import EraseButton from './EraseButton';
import Navbar from './Navbar';
import RouteInput from './RouteInput';
import RouteView from './RouteView';
import TimeInput from './TimeInput';
import { useContext } from 'react';
import { TabContext } from '@contexts/TabContext';
import VehicleInput from './VehicleInput';

// import i18n from "@utils/translation";
// i18n.changeLanguage("")

export default function SearchPage() {
  const { tab } = useContext(TabContext);

  return (
    <div className="my-circ-grad relative mx-auto flex h-svh max-w-xl flex-col items-center justify-center gap-3 p-3">
      {/* Search bar */}
      {/* <RouteInput /> */}
      <VehicleInput />

      <div className="flex w-full justify-between">
        <TimeInput />
        <EraseButton />
      </div>

      {/* Map */}
      <motion.div className="h-full w-full rounded-2xl bg-white p-2">
        <RouteView className="h-full w-full flex-1 rounded-2xl" />
      </motion.div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
}
