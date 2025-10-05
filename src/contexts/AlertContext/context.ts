import { createContext } from 'react';

export type Alert = 'LongDelay' | 'NoAirConditioning' | 'Overcrowded' | 'Malfunction' | 'Thanks';

export const AlertContext = createContext<{
  alert: Alert | null;
  setAlert: (alert: Alert | null) => void;
}>({
  alert: null,
  setAlert: () => {},
});
