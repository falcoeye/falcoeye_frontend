/* global google */
import { GoogleMap, HeatmapLayerF } from "@react-google-maps/api";
import React, { useContext } from "react";
import MapContext from "../../store/map-context";
import { MapContainer, AnimationWrapper } from "./Map.styled";
import { blueWater, brightAndBubbly, cobalt, lightDream, simpleNightVersion, varsoNavy } from "./MapStyles";
import { heatMapData } from "./mapData";
import TopBar from "../../Components/TopBar/TopBar";
import { useState } from "react";
import BottomBar from "../../Components/BottomBar/BottomBar";
import { useLoadScript } from "@react-google-maps/api";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import Lottie from "lottie-react";
import noMapDataAnimation from "../../assets/animations/no-map-data.json";

const mapStyles = {
    cobalt,
    dark: simpleNightVersion,
    blueWater: blueWater,
    light: lightDream,
    brightBubbly: brightAndBubbly,
    varsoNavy: varsoNavy,
};

const initialZoom = 6;

const initialCenter = {
    lat: 24.774265,
    lng: 46.738586,
};

const mapContainerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
};
const libraries = ["places", "visualization"];

const Map = () => {
    const { mapMode } = useContext(MapContext);
    const [weightType, setWeightType] = useState("n_cracks")
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCvQYmlYtxWzuXKU_kZEi-iJLEUAj53FUM",
        libraries,
    });

    if (!isLoaded) return <LoadingSpinner />;
    if (loadError)
        return (
            <AnimationWrapper>
                <Lottie animationData={noMapDataAnimation} loop={true} style={{ width: "100%", height: "100%" }} />
            </AnimationWrapper>
        );

    let data = heatMapData.map((item) => {
        return {
            location: new google.maps.LatLng(item.latitude, item.longitude),
            weight: item[weightType],
        }
    });
    return (
        <>
            <TopBar value={weightType} updateValue={setWeightType} />
            <MapContainer>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={initialZoom}
                    center={initialCenter}
                    options={{
                        styles: mapStyles[mapMode],
                        disableDefaultUI: true,
                    }}
                >
                    <HeatmapLayerF data={data} options={{ opacity: 1 }} />
                </GoogleMap>
            </MapContainer>
            <BottomBar data={data} />
        </>
    );
};

export default Map;
