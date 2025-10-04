import { MapContainer, TileLayer } from 'react-leaflet';
import { twMerge } from 'tailwind-merge';

const position: [number, number] = [50.06784, 19.9913];

type Props = {
  className?: string;
};

export default function RouteView(props: Props) {
  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      className={twMerge('', props.className)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>, Service by <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
        url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
