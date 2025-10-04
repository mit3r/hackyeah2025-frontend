import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer } from 'react-leaflet';

// import i18n from "@utils/translation";
// i18n.changeLanguage("")

const position: [number, number] = [50.06784, 19.9913];

export default function Welcome() {
  const [t] = useTranslation('index');

  return (
    <div className="flex h-svh w-svw flex-col items-center justify-center">
      <h1>Witaj na HackYeah 2024!</h1>

      <p>{t('organization')}</p>

      {/* <div className="h-96 w-96"> */}
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '400px', width: '50%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
      </MapContainer>
      {/* </div> */}
    </div>
  );
}
