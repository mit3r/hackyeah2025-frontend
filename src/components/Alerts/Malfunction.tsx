import Popup from '@components/Popup';
import PopButton from './PopButton';

type Props = {
  onClose: () => void;
};

function Label() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span>Zgłoszenie od obsługi</span>

      <span className="flex w-full items-center justify-center gap-2 rounded-full bg-red-800 p-2 text-white">
        Awaria
        <img className="" src="dangerous_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
      </span>
    </div>
  );
}

export default function Malfunction({ onClose }: Props) {
  return (
    <Popup label={<Label />}>
      <p>
        Pociąg wymaga konserwacji. Szacowany czas opóźnienia to 30 minut. Przepraszamy za
        niedogodności.
      </p>
      <PopButton outline onClick={onClose}>
        OK
      </PopButton>
    </Popup>
  );
}
