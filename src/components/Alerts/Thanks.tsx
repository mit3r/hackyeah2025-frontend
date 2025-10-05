import Popup from '@components/Popup';
import PopButton from './PopButton';

type Props = {
  onClose: () => void;
};

function Label() {
  return (
    <span className="flex items-center justify-center gap-2">
      <img className="invert" src="comment_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
      Thanks
    </span>
  );
}

export default function Thanks({ onClose }: Props) {
  return (
    <Popup label={<Label />}>
      <p>Janek thanked you for your accurate report!</p>

      <PopButton outline onClick={onClose}>
        Okey
      </PopButton>
    </Popup>
  );
}
