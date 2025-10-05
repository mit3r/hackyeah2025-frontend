import { useState } from 'react';
import { ReportContext } from './context';
import ReportForm from '@contexts/ReportContext/ReportForm';
import { AnimatePresence, motion } from 'motion/react';

export default function ReportProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);

  const showForm = () => setIsVisible(true);
  const hideForm = () => setIsVisible(false);

  return (
    <ReportContext.Provider value={{ showForm, hideForm, isVisible }}>
      <AnimatePresence initial={false} mode="wait">
        {isVisible && (
          <motion.div
            key="report-form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <ReportForm onClose={hideForm} />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </ReportContext.Provider>
  );
}
