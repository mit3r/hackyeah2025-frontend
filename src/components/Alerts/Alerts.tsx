import { useCallback, useEffect, useRef, useState } from 'react';
import LongDelay from './LongDelay';
import Malfunction from './Malfunction';
import Overcrowded from './Overcrowded';
import NoAirConditioning from './NoAirConditioning';
import Thanks from './Thanks';

export type Alert = 'LongDelay' | 'NoAirConditioning' | 'Overcrowded' | 'Malfunction' | 'Thanks';

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert | null>(null);

  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    websocket.current = new WebSocket('ws://localhost:8080/alerts');

    websocket.current.onopen = () => {
      console.log('WebSocket connected');
    };

    websocket.current.onmessage = (event) => {
      const alert: Alert = JSON.parse(event.data) as Alert;

      setAlerts(alert);
    };
  }, []);

  const close = useCallback(() => setAlerts(null), []);

  switch (alerts) {
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
    default:
      return null;
  }
}
