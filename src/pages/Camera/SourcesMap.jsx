import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../Components/UI/Loader/Loader';
import { mapStyles } from "./mapStyles";

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  position: 'relative',
};

const initialCenter = {
  lat: 26.8182,
  lng: 8.2275,
};
const initialZoom = 2;

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
          styles: mapStyles
        }}
        zoom={initialZoom}
        center={initialCenter}
      >
        {sources.data.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: +marker.latitude, lng: +marker.longitude }}
            onClick={() => setSelected(marker)}
          />
        ))}
        {selected && (
          <InfoWindow
            position={{ lat: +selected.latitude, lng: +selected.longitude }}
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
