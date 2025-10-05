import Popup from '@components/Popup';
import PopButton from './PopButton';

type Props = {
  onClose: () => void;
};

function Label() {
  return (
    <span className="flex items-center justify-center gap-2">
      <img className="invert" src="comment_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
      Podziękowanie
    </span>
  );
}

export default function Thanks(props: Props) {
  return (
    <Popup label={<Label />}>
      <p>Janek podziękował Ci za ostatnie zgłoszenie!</p>

      <PopButton outline onClick={props.onClose}>
        Ok
      </PopButton>
    </Popup>
  );
}
