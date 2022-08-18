import { Fragment } from 'react';
import Chip from '../../../../../../Components/UI/Chip/Chip';
import Loader from '../../../../../../Components/UI/Loader/Loader';
import MediaCards from './components/MediaCards/MediaCards';
import SourceCards from './components/SourceCards/SourceCards';

const Source = (props) => {
    const { selectedType, selectedSource, updateType, updateSource, fetchingParams, params } = props;

    if (fetchingParams && !params) {
        return <Loader height="96" />;
    }
    let content;
    if (!fetchingParams && params) {
        content = (
            <div>
                <div className="flex gap-[10px] justify-center" >
                    {params.sources.map((source, index) => {
                        return (
                            <Chip key={index} clickHandler={updateType.bind(null, source)} active={selectedType === source} >
                                {source.replace('_', ' ')}
                            </Chip>
                        )
                    })}
                </div>
                <div className="mt-5">
                    { (selectedType === 'video'  || selectedType === 'image') && <MediaCards selectedType={selectedType} selectedSource={selectedSource} updateSource={updateSource} />}
                    { (selectedType === 'streaming_source' ) && <SourceCards selectedType={selectedType} selectedSource={selectedSource} updateSource={updateSource} />}
                </div>
            </div>
        )
    }

    return <Fragment>{content}</Fragment>;
};
export default Source;
