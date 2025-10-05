import Popup from '@components/Popup';
import PopButton from './PopButton';

type Props = {
  onClose: () => void;
};

function Label() {
  return (
    <span className="flex items-center justify-center gap-2">
      <img className="invert" src="info_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
      Opóźnienie
    </span>
  );
}

export default function LongDelay({ onClose }: Props) {
  return (
    <Popup label={<Label />}>
      <p>Wystąpiło długie opóźnienie. Czy chciałbyś poczekać, czy wybrać alternatywną trasę?</p>

      <div className="flex w-full gap-2">
        <PopButton onClick={onClose}>Czekaj</PopButton>
        <PopButton outline onClick={onClose}>
          Wybierz
        </PopButton>
      </div>
    </Popup>
  );
}
