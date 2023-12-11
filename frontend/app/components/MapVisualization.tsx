"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState, useCallback, useEffect } from "react";

export default function MapVisualization({
  lat,
  lng,
  draggable,
  label,
  style,
  coordinatesFetcher,
}: {
  lat: number;
  lng: number;
  draggable: boolean;
  label: string;
  style: string;
  coordinatesFetcher?: ({ lat, lng }: { lat: number; lng: number }) => void;
}) {
  const [position, setPosition] = useState({ lat: lat, lng: lng });
  const [mapDrag, setMapDrag] = useState(false);

  const markerDrag = useCallback((e: google.maps.MapMouseEvent) => {
    setPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }, []);

  const toggleMapDrag = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setMapDrag((value) => !value);
    },
    [],
  );

  useEffect(() => {
    if (coordinatesFetcher) {
      coordinatesFetcher(position); // parent component fetch the marker position
    }
  }, [position]);

  return (
    <div className={style}>
      <p className="mb-4 text-xl font-semibold">{label}</p>

      <div className="relative h-[70vh]">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map center={{ lat, lng }} zoom={12} draggable={mapDrag}>
            <button
              className={
                (mapDrag ? "bg-red-700 " : "bg-green-700 ") +
                "absolute left-[10px] top-24 h-10 w-28 rounded-md font-medium text-white hover:bg-teal-400"
              }
              onClick={toggleMapDrag}
            >
              {mapDrag ? "Hentikan" : "Geser Peta"}
            </button>

            <Marker
              position={position}
              draggable={draggable}
              onDragEnd={markerDrag}
            />
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}
