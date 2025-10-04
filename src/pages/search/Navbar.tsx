import { TabContext } from '@contexts/TabContext';
import clsx from 'clsx';
import { animate, motion, useMotionValue } from 'motion/react';
import { useCallback, useContext, useRef } from 'react';

export default function Navbar() {
  const { setTabNumber } = useContext(TabContext);

  const x = useMotionValue(0);
  const bubble = useRef<HTMLDivElement>(null);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (!bubble.current) return;
      const rectBubble = bubble.current.getBoundingClientRect();
      const rectBar = (e.target as HTMLElement).getBoundingClientRect();

      animate(x, touch.clientX - rectBar.left - rectBubble.width * 0.5, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    },
    [x],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!bubble.current) return;
      const rectBar = (e.target as HTMLElement).getBoundingClientRect();
      const rectBubble = bubble.current.getBoundingClientRect();
      const touch = e.changedTouches[0];
      const newX = Math.round(
        ((touch.clientX - rectBar.left - rectBubble.width * 0.5) / rectBar.width) * 4,
      );
      animate(x, (newX * rectBar.width) / 4);
      setTabNumber(Math.min(Math.max(newX, 0), 3));
    },
    [setTabNumber, x],
  );

  return (
    <div className="absolute bottom-0 z-[1000] w-full p-4">
      {/* <div className="my-shadow aspect-[3.5] w-full rounded-full p-8 backdrop-blur-xs"> */}
      <div className="my-shadow relative w-full rounded-full bg-white px-6 py-2">
        <div
          className="relative grid aspect-[4] w-full grid-cols-4 grid-rows-1"
          style={{
            justifyItems: 'center',
            alignItems: 'center',
          }}
          onTouchStart={handleTouchMove}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <motion.div
            ref={bubble}
            className="pointer-events-none absolute top-0 left-0 aspect-square h-full bg-green-700"
            style={{ x, borderRadius: '50%' }}
          />

          <img
            className={clsx('pointer-events-none', {
              invert: true,
            })}
            src="train_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
            width={30}
            height={30}
          />

          <img
            className={clsx('pointer-events-none invert')}
            src="location_on_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
            width={30}
            height={30}
          />

          <img
            className={clsx('pointer-events-none invert')}
            src="groups_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
            width={30}
            height={30}
          />

          <img
            className={clsx('pointer-events-none invert')}
            src="settings_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );
}
