import { Fragment } from 'react';
import Chip from '../../../../../../Components/UI/Chip/Chip';
import Loader from '../../../../../../Components/UI/Loader/Loader';
import MediaCards from './components/MediaCards/MediaCards';

const defaultData = {
    sources: ['video', 'streaming_source'],
    params: [
        {
            name: 'filename',
            type: 'string',
            disc: 'filepath for video in case of streaming from video file',
            source: 'infered',
            default: null,
        },
        {
            name: 'url',
            type: 'string',
            disc: 'url for camera in case of streaming server',
            source: 'infered',
            default: null,
        },
        {
            name: 'host',
            type: 'string',
            disc: 'host for camera in case of rtsp camera',
            source: 'infered',
            default: null,
        },
        {
            name: 'port',
            type: 'string',
            disc: 'port for camera in case of rtsp camera',
            source: 'infered',
            default: null,
        },
        {
            name: 'username',
            type: 'string',
            disc: 'username for camera in case of rtsp camera',
            source: 'infered',
            default: null,
        },
        {
            name: 'password',
            type: 'string',
            disc: 'password for camera in case of rtsp camera',
            source: 'infered',
            default: null,
        },
        {
            name: 'sample_every',
            type: 'int',
            disc: 'Sample every (seconds for stream and frame for video)',
            source: 'user',
            default: 1,
        },
        {
            name: 'min_score_thresh',
            type: 'float',
            disc: 'Minimum detection confidance ([0-1])',
            source: 'user',
            default: 0.5,
        },
        {
            name: 'max_boxes',
            type: 'int',
            disc: 'Maximum number of detections ([0-100])',
            source: 'user',
            default: 100,
        },
        {
            name: 'min_to_trigger_in',
            type: 'int',
            disc: 'Number of consecutive detections before start recording ([1-10])',
            source: 'user',
            default: 5,
        },
        {
            name: 'min_to_trigger_out',
            type: 'int',
            disc: 'Number of consecutive miss-detections before stop recording ([1-10])',
            source: 'user',
            default: 5,
        },
        {
            name: 'length',
            type: 'float',
            disc: 'Length of streaming (seconds, -1 for entire video)',
            source: 'user',
            default: -1,
        },
        {
            name: 'frequency',
            type: 'int',
            disc: 'Length of streaming (seconds, -1 for entire video)',
            source: 'user',
            default: 5,
        },
        {
            name: 'timed_gate_open_freq',
            type: 'int',
            disc: 'Frequency of opening timed gate in a leaky valve (i.e. every what frames?)',
            source: 'user',
            default: 30,
        },
        {
            name: 'timed_gate_opened_last',
            type: 'int',
            disc: 'Time the timed gate is kept open (i.e. after how many frames?) < timed_gate_open_freq',
            source: 'user',
            default: 10,
        },
        {
            name: 'ntasks',
            type: 'int',
            disc: 'Number of tcp process at a time',
            source: 'user',
            default: 4,
        },
    ],
};

const Source = (props) => {
    const { id, selectedType, selectedSource, updateType, updateSource, fetchingParams, params } = props;


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
                                {source}
                            </Chip>
                        )
                    })}
                </div>
                <div className="mt-5">
                    { (selectedType === 'video'  || selectedType === 'image') && <MediaCards selectedType={selectedType} selectedSource={selectedSource} updateSource={updateSource} />}
                </div>
            </div>
        )
    }

    return <Fragment>{content}</Fragment>;
};
export default Source;
