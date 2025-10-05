import PopButton from '@components/Alerts/PopButton';
import { AlertContext } from '@contexts/AlertContext/context';
import { useContext, useRef, useState } from 'react';

const reports = ['Usterka', 'Opóźnienie', 'Wypadek', 'Przeciążenie', 'Inne'];

const priorityColors = ['#00cc00', '#66cc00', '#cccc00', '#cc6600', '#cc0000'];

export default function ReportForm({ onClose }: { onClose?: () => void }) {
  const it = useRef<number | null>(null);

  const { setAlert } = useContext(AlertContext);

  const [priority, setPriority] = useState<number>(1); //1-5

  const handleSubmit = () => {
    if (onClose) onClose();

    it.current = setTimeout(() => {
      setAlert('Thanks');

      console.log('Report submitted');
    }, 3000);
  };

  return (
    <div className="absolute z-1050 flex h-full w-full flex-col justify-end p-4 backdrop-brightness-50">
      <div className="my-shadow flex flex-col gap-4 rounded-2xl bg-gray-200 p-6">
        <span className="flex items-center justify-between">
          <h1 className="text-2xl">Dodawanie zgłoszenia</h1>
          <img
            className="invert"
            onClick={onClose}
            src="close_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
          />
        </span>
        <label className="text-xl" htmlFor="">
          Typ zgłoszenia
        </label>
        <select className="rounded-2xl border-2 p-2 text-xl" name="" id="">
          {reports.map((report) => (
            <option className="hover:bg-gray-200" value={report} key={report}>
              {report}
            </option>
          ))}
        </select>

        <label className="text-xl" htmlFor="">
          Opis
        </label>
        <textarea
          className="rounded-2xl border-2 p-2 text-xl"
          placeholder="Opis zgłoszenia"
          name=""
          id=""
          rows={4}
        ></textarea>

        <label htmlFor="">Priorytet</label>

        <div className="flex gap-2">
          {new Array(5).fill(0).map((_, i) => (
            <div
              style={{ backgroundColor: priorityColors[i] }}
              className={`my-shadow mx-1 h-8 w-8 cursor-pointer rounded-full border-[1px] border-white ${priority === i + 1 ? 'ring-4 ring-black' : ''}`}
              key={i}
              onClick={() => setPriority(i + 1)}
            ></div>
          ))}
        </div>

        <label htmlFor="">Szacowany czas</label>
        <input type="text" placeholder="1 godzina" className="rounded-2xl border-2 p-2 text-xl" />

        <PopButton onClick={handleSubmit}>
          <span className="text-xl">Zgłoś problem</span>
        </PopButton>
      </div>
    </div>
  );
}
