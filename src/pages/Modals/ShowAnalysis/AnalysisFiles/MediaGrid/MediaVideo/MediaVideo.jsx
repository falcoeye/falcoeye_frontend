import { useCallback, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { toast } from 'react-toastify';
import axios from '../../../../../../utility/api-instance';
import { FaPlay } from "react-icons/fa";

const MediaVideo = (props) => {
    const { file, id } = props;

    const [mediaPreview, setMediaPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchVideo = useCallback(() => {
        const controller = new AbortController();
        let url = `/analysis/${id}/${file}`;
        axios
            .get(url)
            .then((res) => {
                setLoading(false);
                setMediaPreview(res.data);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data.message);
            });

        return () => {
            controller.abort();
        };
    }, [id, file]);


    let renderedPreview;
    if (!mediaPreview) {
        renderedPreview = (
            <div className={`flex justify-center items-center h-full w-full bg-gray-500 ${loading && "animate-pulse"} cursor-pointer`} onClick={fetchVideo}>
                {/* <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512" >
                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg> */}
                <FaPlay className="w-12 h-12 text-gray-200" />
            </div>
        )
    } else if (!loading && mediaPreview) {
        renderedPreview = (
            <ReactPlayer controls url={mediaPreview} width='100%' height='100%'  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        );
    }
    return (
        <div className="flex justify-center items-center aspect-video bg-gray-300 dark:bg-gray-700 ">
            {renderedPreview}
        </div>
    );
};
export default MediaVideo;
