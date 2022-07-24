import { Fragment, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Components/UI/Loader/Loader";
import SourceCard from "./SourceCard";
import SourceShow from "./SourceShow";

const SourcesGrid = props => {

    const [ selectedCardId, setSelectedCardId ] = useState(null)
    const [ showModalOpened, setShowModalOpened] = useState(false)

    const sources = useSelector((state) => state.sources);


    const openShowModalHandler =  useCallback( ( id ) => {
        setShowModalOpened(true)
        setSelectedCardId(id)
    }, [])
    const closeShowModalHandler =  useCallback( ( ) => {
        setShowModalOpened(false)
        setSelectedCardId(null)
    }, [])

    if (sources.fetchingSources) {
        return <Loader height='96' />
    }
    if (sources.data.length === 0 && !sources.fetchingSources) {
        return <p>there is no sources</p>
    }

    const sourcesCards = sources.data.map(source => {
        return <SourceCard key={source.id} source={source} handleClick={openShowModalHandler} />
    })

    return (
        <Fragment>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sourcesCards}
            </div>
            <SourceShow open={showModalOpened} handleClose={closeShowModalHandler} id={selectedCardId} />
        </Fragment>
    )
}
export default SourcesGrid;