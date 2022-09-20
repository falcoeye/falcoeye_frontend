import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../../../../../Components/UI/Loader/Loader';
import axios from '../../../../../../utility/api-instance';

const MediaVideo = (props) => {
    const { file, id } = props;

    const [mediaPreview, setMediaPreview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    if (loading && !mediaPreview) {
        renderedPreview = <Loader height="h-full" />;
    }
    if (!loading && mediaPreview) {
        renderedPreview = (
            <video className="w-full h-full object-cover block" controls>
                <source src={mediaPreview} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }
    return (
        <div className="flex justify-center items-center aspect-video bg-gray-300 dark:bg-gray-700 ">
            {renderedPreview}
        </div>
    );
};
export default MediaVideo;
