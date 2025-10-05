import Popup from '@components/Popup';
import PopButton from './PopButton';

type Props = {
  onClose: () => void;
};

function Label() {
  return (
    <span className="flex items-center justify-center gap-2">
      <img className="invert" src="info_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
      Long Delay
    </span>
  );
}

export default function LongDelay({ onClose }: Props) {
  return (
    <Popup label={<Label />}>
      <p>There is a long delay. Would you like to wait or take an alternative route?</p>

      <div className="flex w-full gap-2">
        <PopButton onClick={onClose}>Wait</PopButton>
        <PopButton outline onClick={onClose}>
          Take
        </PopButton>
      </div>
    </Popup>
  );
}
