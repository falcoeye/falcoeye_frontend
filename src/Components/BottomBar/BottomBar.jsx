import React, { useState } from "react";
import { BottomBarContainer } from "./BottomBar.styled";
import MapStyleModal from "../../pages/Map/components/MapStyleModal/MapStyleModal";
import { useCSVDownloader } from 'react-papaparse';
import { AiOutlineDownload } from 'react-icons/ai';
import { AiFillSetting } from 'react-icons/ai';

const BottomBar = ({ data }) => {
    const [mapModal, setMapModal] = useState(false);
    const { CSVDownloader, Type } = useCSVDownloader();
    const openMapModalHandler = () => setMapModal(true);
    const closeMapModalHandler = () => setMapModal(false);

    return (
        <>
            <BottomBarContainer>
                <CSVDownloader
                    type={Type.Button}
                    filename={"map-data"}
                    bom={true}
                    config={{
                        delimiter: ';',
                    }}
                    data={data}
                    className="download-button"
                >

                    <AiOutlineDownload />
                </CSVDownloader>
                <button onClick={openMapModalHandler} type="button" className="text-white bg-transparent focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:focus:ring-blue-800">
                    <AiFillSetting className="svg-setting" />

                </button>
            </BottomBarContainer>

            <MapStyleModal open={mapModal} onClose={closeMapModalHandler} />
        </>
    );
};

export default BottomBar;
