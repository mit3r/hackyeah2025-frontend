import { clsx } from 'clsx';

export default function PopButton(props: {
  onClick: () => void;
  children?: React.ReactNode;
  outline?: boolean;
}) {
  return (
    <button
      className={clsx(
        'w-full rounded-2xl border p-2 transition-all hover:scale-105 active:scale-95',
        {
          'border-2 border-green-700': props.outline,
          'bg-green-700 text-white': !props.outline,
        },
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
