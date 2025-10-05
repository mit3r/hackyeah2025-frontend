import { useState } from 'react';
import { Alert, AlertContext } from './context';

export default function AlertProvider(props: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<Alert | null>(null);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>{props.children}</AlertContext.Provider>
  );
}
