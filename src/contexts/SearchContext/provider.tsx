import { useState } from 'react';
import { SearchContext } from './context';

export default function SearchProvider(props: { children: React.ReactNode }) {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const [vehicle, setVehicle] = useState<string>('');

  const swapLocations = () => {
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
  };

  return (
    <SearchContext.Provider
      value={{
        startLocation,
        setStartLocation,
        endLocation,
        setEndLocation,
        swapLocations,
        vehicle,
        setVehicle,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
