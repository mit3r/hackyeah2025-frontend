import { Route } from '@type/routes';
import { useState } from 'react';
import { DetailsContext } from './context';

export default function DetailsProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<Route[] | null>(null);

  const handleSetRoute = (newRoute: Route[] | null) => {
    setRoute(newRoute);
  };

  return (
    <DetailsContext.Provider value={{ route, setRoute: handleSetRoute }}>
      {children}
    </DetailsContext.Provider>
  );
}
