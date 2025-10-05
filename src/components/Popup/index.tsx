import { motion } from 'motion/react';
import { PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
  label?: ReactNode;
}>;

export default function Popup(props: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute top-0 left-0 z-1100 flex h-svh w-full items-end justify-center p-4 py-16 backdrop-brightness-50"
    >
      <div className="my-shadow flex flex-col gap-4 rounded-2xl bg-white p-4">
        <h2 className="text-center text-xl">{props.label}</h2>
        {props.children}
      </div>
    </motion.div>
  );
}
