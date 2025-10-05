import { motion } from 'motion/react';

export default function Switch(props: {
  onChange: (option: string) => void;
  options: [string, string];
  labels: [string, string];
  choosen: string;
}) {
  return (
    <button className="w-full rounded-full bg-gray-300 px-2 py-2">
      <div className="relative grid grid-cols-2 grid-rows-1">
        {props.options.map((option, index) => (
          <div className="z-1000 w-full p-2" key={option} onClick={() => props.onChange(option)}>
            {props.labels[index]}
          </div>
        ))}

        {/* Cursor */}
        <motion.div
          className="pointer-events-none absolute top-0 left-0 h-full w-1/2 rounded-full bg-white"
          animate={{ x: props.choosen === props.options[0] ? '0%' : '100%' }}
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        />
      </div>
    </button>
  );
}
