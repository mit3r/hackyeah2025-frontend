import { Tab } from '@type/home';
import { createContext } from 'react';

export const tabs: Tab[] = ['searchRoute', 'searchVehicle', 'profile', 'options'];

export const TabContext = createContext<{
  tab: Tab;
  setTabNumber: (tab: number) => void;
  setTabName: (tab: Tab) => void;
}>({
  tab: 'searchRoute',
  setTabNumber: () => {},
  setTabName: () => {},
});
