import { useState } from 'react';
import { Train, TrainContext } from './context';

export default function TrainProvider({ children }: { children: React.ReactNode }) {
  const [train, setTrain] = useState<Train | null>(null);

  return <TrainContext.Provider value={{ train, setTrain }}>{children}</TrainContext.Provider>;
}
