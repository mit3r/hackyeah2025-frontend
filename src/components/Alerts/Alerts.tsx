import { AlertContext } from '@contexts/AlertContext/context';
import { useCallback, useContext } from 'react';
import LongDelay from './LongDelay';
import Malfunction from './Malfunction';
import NoAirConditioning from './NoAirConditioning';
import Overcrowded from './Overcrowded';
import Thanks from './Thanks';

export default function Alerts() {
  const { alert, setAlert } = useContext(AlertContext);

  // const websocket = useRef<WebSocket | null>(null);

  // useEffect(() => {
  //   websocket.current = new WebSocket(`${import.meta.env.VITE_WS_URL}/alerts`);

  //   websocket.current.onopen = () => {
  //     console.log('WebSocket connected');
  //   };

  //   websocket.current.onmessage = (event) => {
  //     const alert: Alert = JSON.parse(event.data) as Alert;

  //     setAlerts(alert);
  //   };
  // }, []);

  const close = useCallback(() => setAlert(null), []);

  switch (alert) {
    case 'LongDelay':
      return <LongDelay onClose={close} />;
    case 'NoAirConditioning':
      return <NoAirConditioning onClose={close} />;
    case 'Overcrowded':
      return <Overcrowded onClose={close} />;
    case 'Malfunction':
      return <Malfunction onClose={close} />;
    case 'Thanks':
      return <Thanks onClose={close} />;
    case null:
      return null;
    default:
      return null;
  }
}
