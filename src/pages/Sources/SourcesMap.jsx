import {
  GoogleMap, Marker,
  useLoadScript
} from '@react-google-maps/api';
import Lottie from 'lottie-react';
import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import noMapDataAnimation from '../../assets/animations/no-map-data.json';
import Loader from '../../Components/UI/Loader/Loader';
import ShowSource from '../Modals/ShowSource/ShowSource';
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

  const [showSourceOpened, setShowSourceOpened] = useState(false);

  const markerClickHandler = (id) => {
    setSelected(id)
    setShowSourceOpened(true);
  };
  const closeSourceModalHandler = () => {
    setShowSourceOpened(false);
    setSelected(null)
  };

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
    <div className="relative" >
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
            onClick={() => markerClickHandler(marker.id)}
          />
        ))}
        {selected && showSourceOpened && (
          <ShowSource
              open={showSourceOpened}
              handleClose={closeSourceModalHandler}
              id={selected}
            />
        )}
      </GoogleMap>
      {
        sources.data.length === 0 && (
        <div className="absolute w-full h-full inset-0 overflow-y-auto bg-slate-50/50">
              <Lottie animationData={noMapDataAnimation} loop={true}  style={{ 'width': '100%', 'height': '100%' }} />
        </div>
        )
      }
    </div>
  );
}

export default SourcesMap;
