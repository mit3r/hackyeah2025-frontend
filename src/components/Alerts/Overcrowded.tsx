import Popup from '@components/Popup';

type Props = {
  onClose: () => void;
};

export default function Overcrowded({ onClose }: Props) {
  return (
    <Popup label="Overcrowded">
      <p>This vehicle is overcrowded.</p>
      <button onClick={onClose}>Close</button>
    </Popup>
  );
}
