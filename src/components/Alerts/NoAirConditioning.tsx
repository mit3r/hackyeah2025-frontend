import Popup from '@components/Popup';
import PopButton from './PopButton';

type Props = {
  onClose: () => void;
};

function Label() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span>Zgłoszenie od użytkownika</span>

      <span className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-600 p-2 text-white">
        No Air Conditioning
        <img className="invert" src="info_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
      </span>
    </div>
  );
}

export default function NoAirConditioning({ onClose }: Props) {
  return (
    <Popup label={<Label />}>
      <p>There is no air conditioning available in this vehicle.</p>

      <p>Is the issue still occurring?</p>
      <div className="flex w-full gap-2">
        <PopButton outline onClick={onClose}>
          Yes
        </PopButton>
        <PopButton onClick={onClose}>No</PopButton>
      </div>
    </Popup>
  );
}
