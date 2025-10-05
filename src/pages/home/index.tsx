import { DetailsContext } from '@contexts/DetailsContext';
import { TabContext } from '@contexts/TabContext';
import ViewProfile from '@pages/ViewProfile';
import ViewSearch from '@pages/ViewSearch';
import { useContext } from 'react';
import Navbar from './Navbar';

// import i18n from "@utils/translation";
// i18n.changeLanguage("")

export default function HomePage() {
  const { tab } = useContext(TabContext);
  const { route } = useContext(DetailsContext);
  // const { startLocation, endLocation } = useContext(SearchContext);

  // Calculate if we should show search results or route details
  // const searched =
  //   startLocation !== '' &&
  //   endLocation !== '' &&
  //   (tab === 'searchRoute' || tab === 'searchVehicle');
  // const showRoutesList = searched && route === null;
  // const showRoutePreview = searched && route !== null;

  // Hide navbar only when showing actual results (routes list or route details)
  const showNavbar = route === null;

  return (
    <div className="my-circ-grad relative mx-auto flex h-svh max-w-xl flex-col items-center justify-center gap-3 p-3">
      {tab === 'searchRoute' || tab === 'searchVehicle' ? <ViewSearch /> : null}

      {tab === 'profile' ? <ViewProfile /> : null}

      {/* Navbar - hidden when showing route details */}
      {showNavbar && <Navbar />}
    </div>
  );
}
