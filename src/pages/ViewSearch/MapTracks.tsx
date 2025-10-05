import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

type TrackData = {
  locations: {
    id: number;
    vehicle_id: string;
    latitude: number;
    longitude: number;
  }[];
};

export default function MapTracks() {
  const map = useMap();

  const [, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TrackData | null>(null);

  useEffect(() => {
    if (!map) return;

    const { x, y } = map.getSize();

    const p = {
      map_height: Math.round(x).toString(),
      map_width: Math.round(y).toString(),
      latitude: map.getCenter().lat.toFixed(5).toString(),
      longitude: map.getCenter().lng.toFixed(5).toString(),
      zoom: map.getZoom().toString(),
    };

    const response = fetch(
      `${import.meta.env.VITE_GPS_URL}/api/geo/vehicles/?longitude=${p.longitude}&latitude=${p.latitude}&zoom=${p.zoom}&map_width=${p.map_width}&map_height=${p.map_height}`,
      {
        method: 'GET',
      },
    );

    response
      .then((res) => res.json())
      .then((json) => {
        setData(json as TrackData);
        setLoading(false);
      });
  }, [map]);

  console.log(data?.locations);
  return data !== null
    ? data.locations.map((location) => (
        <Marker key={location.vehicle_id} position={[location.latitude, location.longitude]}>
          <Popup>{location.vehicle_id}</Popup>
        </Marker>
      ))
    : null;
}
