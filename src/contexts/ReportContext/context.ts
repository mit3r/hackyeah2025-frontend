import { createContext } from 'react';

export const ReportContext = createContext<{
  showForm: () => void;
  hideForm: () => void;
  isVisible: boolean;
}>({
  showForm: () => {},
  hideForm: () => {},
  isVisible: false,
});
