import { Fragment } from "react";
import { useCallback } from "react";
import { useState } from "react";
import ShowAnalysis from "../../Modals/ShowAnalysis/ShowAnalysis";
import axios from '../../../utility/api-instance';
import { useEffect } from "react";
import { toast } from "react-toastify";

const AnalysisThumbnail = (props) => {
    const { item } = props;
    const [showAnalysisOpened, setShowAnalysisOpened] = useState(false)

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        axios
            .get(`workflow/${item.workflow_id}/img_260.jpg`, {
                responseType: "blob",
                signal: controller.signal,
            })
            .then((res) => {
                // we can all pass them to the Blob constructor directly
                const new_blob = new Blob([res.data], { type: "image/jpg" });
                const url = URL.createObjectURL(new_blob);
                setImage(url);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data.message);
            });

        return () => {
            controller.abort();
        };
    }, [item]);

    const showAnalysisOpenHandler = () => { setShowAnalysisOpened(true) }
    const showAnalysisCloseHandler = useCallback(() => { setShowAnalysisOpened(false) }, [])

    return (
        <Fragment>
            <div className="shadow-md rounded-md dark:bg-gray-900 p-5 space-y-5 cursor-pointer " onClick={showAnalysisOpenHandler} >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h4 className="font-semibold text-base md:text-xl text-gray-800 dark:text-gray-200">
                        {item?.name}
                    </h4>
                    <div className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary rounded-md capitalize">
                        {item?.status}
                    </div>
                </div>
            </div>
            {showAnalysisOpened && !loading && image && (
                <ShowAnalysis
                    handleClose={showAnalysisCloseHandler}
                    open={showAnalysisOpened}
                    id={item.id}
                    image={image}
                    workflowId={item.workflow_id}
                />

            )}
        </Fragment>
    )
}
export default AnalysisThumbnail;