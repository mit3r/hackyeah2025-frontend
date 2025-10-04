import { Route } from '@type/routes';
import { createContext } from 'react';

export const DetailsContext = createContext<{
  route: Route[] | null;
  setRoute: (route: Route[] | null) => void;
}>({
  route: null,
  setRoute: () => {},
});
