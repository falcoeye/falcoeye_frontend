import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedia } from "../../../../../../../../store/media";
import Lottie from 'lottie-react';
import Loader from "../../../../../../../../Components/UI/Loader/Loader";
import noDataAnimation from '../../../../../../../../assets/animations/no-data.json'
import MediaCard from "./components/MediaCard";
import { Fragment } from "react";
import ShowMedia from "../../../../../../ShowMedia";

const MediaCards = props => {
    const { selectedType, selectedSource, updateSource,  } = props;

    const [selectedCardId, setSelectedCardId] = useState(null);
    const [showMediaOpened, setShowMediaOpened] = useState(false);

    const dispatch = useDispatch();
    const media = useSelector((state) => state.media);
    const { data, fetchingMedia } = media;

    const [filteredMedia, setFilteredMedia] = useState(data);

    useEffect(() => {
        dispatch(fetchMedia());
    }, [dispatch]);

    const typeFilter = (type, items) => {
        switch (type) {
            case 'all': return items
            default:
                return items.filter(item => item.media_type === type)
        }
    }

    const filterationHandler = useCallback(() => {
        let filteredData = [...data]
        const typeFiltersResults = typeFilter(selectedType, filteredData)
        setFilteredMedia(typeFiltersResults)
    }, [data, selectedType])

    useEffect(() => {
        if (data.length >= 0) {
            filterationHandler()
        }
    }, [data, filterationHandler])

    const openMediaModalHandler = (id) => {
        setShowMediaOpened(true);
        setSelectedCardId(id);
    };
    const closeMediaModalHandler = () => {
    setShowMediaOpened(false);
    };
    

    if (fetchingMedia) {
        return <Loader height="h-[300px]" />;
    }
    if (filteredMedia.length === 0 && !media.fetchingMedia) {
        return (
            <div className="h-96">
                <Lottie
                    animationData={noDataAnimation}
                    loop={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        );
    }

    const mediaCards = filteredMedia.map((media) => {
        return (
            <MediaCard
                key={media.id}
                selectedMediaId={selectedSource}
                media={media}
                handleClick={updateSource}
                handleShowClick={openMediaModalHandler}
            />
        );
    });

    return (
        <Fragment>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mediaCards}
            </div>
            {showMediaOpened && (
            <ShowMedia
                open={showMediaOpened}
                handleClose={closeMediaModalHandler}
                id={selectedCardId}
                />
            )}
        </Fragment>
    )
}
export default MediaCards;