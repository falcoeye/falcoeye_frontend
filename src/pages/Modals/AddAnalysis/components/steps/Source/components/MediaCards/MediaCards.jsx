import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedia, handlePage } from "../../../../../../../../store/media";
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
    const { data, fetchingMedia, page, lastPage  } = media;

    const [filteredMedia, setFilteredMedia] = useState(data);

    useEffect(() => {
        !lastPage && dispatch(fetchMedia(page));
    }, [dispatch, lastPage, page]);

    const ovserver = useRef();
    const lastElementRef = useCallback(
        (node) => {
        if (fetchingMedia) return;
        if (ovserver.current) ovserver.current.disconnect();
        ovserver.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !lastPage) {
            dispatch(handlePage(page + 1));
            }
        });
        if (node) ovserver.current.observe(node);
        },
        [dispatch, fetchingMedia, lastPage, page]
    );

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
    

    if (fetchingMedia && filteredMedia.length === 0) {
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

    const mediaCards = filteredMedia.map((media, index) => {
        if(  filteredMedia.length - 1 === index ) {
            return (
                <MediaCard
                    key={media.id}
                    selectedMediaId={selectedSource}
                    media={media}
                    handleClick={updateSource}
                    handleShowClick={openMediaModalHandler}
                    lastElementRef={lastElementRef}
                />
            );
        }
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