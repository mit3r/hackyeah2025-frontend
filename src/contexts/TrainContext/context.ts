import { createContext } from 'react';

export interface Train {
  id: string;
}

export const TrainContext = createContext<{
  train: Train | null;
  setTrain: (train: Train | null) => void;
}>({
  train: null,
  setTrain: () => {},
});
