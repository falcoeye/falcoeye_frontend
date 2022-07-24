import { useSelector } from "react-redux";
import Loader from "../../Components/UI/Loader/Loader";
import SourceCard from "./SourceCard";

const SourcesGrid = props => {

    const sources = useSelector((state) => state.sources);

    if (sources.fetchingSources) {
        return <Loader height={96} />
    }
    if (sources.data.length === 0 && !sources.fetchingSources) {
        return <p>there is no sources</p>
    }

    const sourcesCards = sources.data.map(source => {
        return <SourceCard key={source.id} source={source} />
    })

    return (
        <div className="container mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sourcesCards}
            </div>
        </div>
    )
}
export default SourcesGrid;