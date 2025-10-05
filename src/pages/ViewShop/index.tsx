import { motion } from 'motion/react';

export default function ViewProfile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full w-full py-8 pb-28"
    >
      <div className="my-shadow flex h-full w-full flex-col gap-4 overflow-y-auto rounded-2xl bg-white p-4">
        <h1 className="flex items-center gap-2 text-2xl">
          <img
            className="aspect-square h-12 invert"
            src="attach_money_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
          />
          <span>Sklepik</span>{' '}
        </h1>
        <div className="my-shadow flex justify-between rounded-full bg-gradient-to-t from-green-200 to-green-100 p-5 text-2xl">
          <span className="font-bold">140 pkt</span>
          <span className="">⭐</span>
        </div>

        <Card
          title="Zniżka -20% na bilet IC"
          points={50}
          bg="linear-gradient(to right, #4caf50, #81c784)"
          icon="attach_money_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
        />

        <Card
          title="Zniżka -30% do sklepu CCC"
          points={100}
          bg="linear-gradient(150deg, orange, white)"
          icon="percent_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
        />

        <Card
          title="Kupon na śniadanie w WARS"
          points={120}
          bg="linear-gradient(130deg, brown, white)"
          icon="local_cafe_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
        />
      </div>
    </motion.div>
  );
}

function Card(props: { title: string; points: number; bg: string; icon: string }) {
  return (
    <div
      className="flex aspect-[2] w-full flex-col rounded-4xl p-5"
      style={{ backgroundImage: props.bg }}
    >
      <span className="text-xl">{props.title}</span>
      <div className="mt-auto flex items-center justify-between">
        <img className="aspect-square h-16 invert" src={props.icon} alt="" />
        <span className="text-2xl font-bold">{props.points} pkt</span>
      </div>
    </div>
  );
}
