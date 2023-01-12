import React, { useState } from "react";

const MapContext = React.createContext({
    mapMode: "",
    changeMode: () => {},
});

export const MapContextProvider = (props) => {
    const initialMode = localStorage.getItem("mapMode") || "cobalt";

    const [mapMode, setMapMode] = useState(initialMode);

    const changeModeHandler = (val) => {
        setMapMode(val);
        localStorage.setItem("mapMode", val);
    };

    const contextValue = {
        mapMode: mapMode,
        changeMode: changeModeHandler,
    };

    return <MapContext.Provider value={contextValue}>{props.children}</MapContext.Provider>;
};

export default MapContext;
