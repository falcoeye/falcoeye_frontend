import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../Components/UI/Loader/Loader';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  position: 'relative',
};

const initialCenter = {
  lat: 46.8182,
  lng: 8.2275,
};
const initialZoom = 6;

const libraries = ['places'];

function SourcesMap() {
  const sources = useSelector((state) => state.sources);

  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCvQYmlYtxWzuXKU_kZEi-iJLEUAj53FUM',
    libraries,
  });

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return <Loader />;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        onLoad={onMapLoad}
        options={{
          disableDefaultUI: true,
        }}
        zoom={initialZoom}
        center={initialCenter}
      >
        {sources.data.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: +marker.utm_x, lng: +marker.utm_y }}
            onClick={() => setSelected(marker)}
          />
        ))}
        {selected && (
          <InfoWindow
            position={{ lat: +selected.utm_x, lng: +selected.utm_y }}
            onCloseClick={() => setSelected(null)}
          >
            <h2 className='text-sm font-semibold' >{selected.name}</h2>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default SourcesMap;
