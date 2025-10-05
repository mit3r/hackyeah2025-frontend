import { TabContext } from '@contexts/TabContext';
import ViewProfile from '@pages/ViewProfile';
import ViewSearch from '@pages/ViewSearch';
import { useContext } from 'react';
import Navbar from './Navbar';

// import i18n from "@utils/translation";
// i18n.changeLanguage("")

export default function HomePage() {
  const { tab } = useContext(TabContext);

  return (
    <div className="my-circ-grad relative mx-auto flex h-svh max-w-xl flex-col items-center justify-center gap-3 p-3">
      {tab === 'searchRoute' || tab === 'searchVehicle' ? <ViewSearch /> : null}

      {tab === 'profile' ? <ViewProfile /> : null}

      <Navbar />
    </div>
  );
}
