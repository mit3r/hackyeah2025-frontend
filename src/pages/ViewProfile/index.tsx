import { motion } from 'motion/react';

export default function ViewProfile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full w-full py-8 pb-28"
    >
      <div className="my-shadow flex h-full w-full flex-col gap-4 rounded-2xl bg-white p-4">
        <h1 className="flex items-center gap-2 text-2xl">
          <img
            className="invert"
            src="account_circle_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
          />
          <span>My Profile</span>{' '}
        </h1>
        <div className="my-shadow flex justify-between rounded-full bg-gradient-to-t from-green-200 to-green-100 p-4 text-2xl">
          <span className="font-bold">14 points</span>
          <span className="">⭐</span>
        </div>
        <h2 className="flex items-center gap-2 text-xl font-bold brightness-50">
          <img className="invert" src="help_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
          <span>How to earn points?</span>
        </h2>
        <ul className="text-gray-600">
          <li>
            - Points can be earned by submitting useful <span className="font-bold">reports</span>{' '}
            about routes.
          </li>
          <li>- Reports usually concern obstacles on the route.</li>
        </ul>
        <hr className="my-4 border-gray-300" />
        <h2 className="flex items-center gap-2 text-xl font-bold brightness-50">
          <img className="invert" src="help_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
          <span>Ranks</span>
        </h2>
        <div className="grid grid-cols-[auto_1fr_auto] gap-4">
          <span>Brąz </span> <span>🥉</span> <span>{'>15pkt'}</span>
          <span> Srebrny </span> <span>🥈</span> <span>{'>25pkt'}</span>
          <span> Złoty </span> <span>🥇</span> <span>{'>50pkt'}</span>
        </div>
        <p>Ranks affect the weight and credibility of reports.</p>
      </div>
    </motion.div>
  );
}
