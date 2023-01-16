import React, { useContext } from "react";
import { MapVersionsBackdrop, MapVersionsContent, BoxesContainer, MapVersionBox } from "./MapStyleModal.styled";
import MapContext from "../../../../store/map-context";

const MapStyleModal = ({ open, onClose }) => {
    const { changeMode, mapMode } = useContext(MapContext);
    console.log(mapMode)
    const selectMapVersionHandler = (value) => {
        console.log(value)
        changeMode(value);
        onClose();
    };

    return (
        <>
            <MapVersionsBackdrop $open={open} onClick={onClose} />
            <MapVersionsContent $open={open}>
                <h5 style={{ color: "white", marginBottom: "14px", textAlign: "center" }}>
                    Choose Map version
                </h5>
                <BoxesContainer>
                    <MapVersionBox $active={mapMode === "dark"} onClick={selectMapVersionHandler.bind(null, "dark")}>
                        Simple Night
                    </MapVersionBox>
                    <MapVersionBox $active={mapMode === "blueWater"} onClick={selectMapVersionHandler.bind(null, "blueWater")}>
                        Blue Water
                    </MapVersionBox>
                    <MapVersionBox $active={mapMode === "varsoNavy"} onClick={selectMapVersionHandler.bind(null, "varsoNavy")}>
                        Varso Navy Blue
                    </MapVersionBox>
                    <MapVersionBox $active={mapMode === "brightBubbly"} onClick={selectMapVersionHandler.bind(null, "brightBubbly")}>
                        Bright & Bubbly
                    </MapVersionBox>
                    <MapVersionBox $active={mapMode === "light"} onClick={selectMapVersionHandler.bind(null, "light")}>
                        Light Dream
                    </MapVersionBox>
                    <MapVersionBox $active={mapMode === "cobalt"} onClick={selectMapVersionHandler.bind(null, "cobalt")}>
                        Cobalt
                    </MapVersionBox>
                </BoxesContainer>
            </MapVersionsContent>
        </>
    );
};

export default MapStyleModal;
