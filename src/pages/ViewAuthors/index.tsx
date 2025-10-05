import { AnimatePresence, motion } from 'motion/react';

export default function ViewAuthors() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className=""
        >
          <h2>Stworzone przez drużynę AKAI</h2>
          <img src="/AKAI_1.svg" alt="" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
