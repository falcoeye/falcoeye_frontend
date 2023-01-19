import { useCallback } from "react";
import { useState } from "react";
import CSVChart from "./CSVChart/CSVChart";
import CSVReport from "./CSVReport/CSVReport";
import TableReport from "./TableReport/TableReport";
import MediaGrid from "./MediaGrid/MediaGrid";

const AnalysisFiles = props => {
    const { id, meta } = props;
    const [csvReportOpened, setCsvReportOpened] = useState(false)
    const [mapReportOpened, setMapReportOpened] = useState(false)

    const csvReportOpenHandler = () => { setCsvReportOpened(true); }
    const csvReportCloseHandler = useCallback(() => {
        setCsvReportOpened(false);
    }, [])
    const mapReportOpenHandler = () => { setMapReportOpened(true); }
    const mapReportCloseHandler = useCallback(() => {
        setMapReportOpened(false);
    }, [])

    return (
        <div className="mt-4">
            <div className="flex items-center mb-5" >
                <h3 className="text-gray-700 text-lg font-bold dark:text-white capitalize flex items-center" >output:
                    <span className='px-3 py-1 text-base rounded-md bg-primary text-white ml-2' >{meta.filenames?.length || 1}</span>
                </h3>
                {meta.type === 'csv' && <button type="button" onClick={csvReportOpenHandler}>
                    <span className="capitalize bg-rose-600 text-white text-sm py-1.5  flex justify-center items-center px-3 rounded-md ml-3"  >
                        <span className="capitalize"> open data</span>
                    </span>
                </button>}
                {meta.type === 'map' && <button type="button" onClick={mapReportOpenHandler}>
                    <span className="capitalize bg-rose-600 text-white text-sm py-1.5  flex justify-center items-center px-3 rounded-md ml-3"  >
                        <span className="capitalize"> open data</span>
                    </span>
                </button>}
            </div>
            {meta.type === 'media' && <MediaGrid id={id} files={meta.filenames} />}
            {meta.type === 'csv' && <CSVChart id={id} file={meta.filename} meta={meta} />}
            {meta.type === 'csv' && csvReportOpened && (
                <CSVReport  open={csvReportOpened} handleClose={csvReportCloseHandler}  id={id} meta={meta} />
            )}
            {meta.type === 'table' && mapReportOpened && (
                <TableReport  open={mapReportOpened} handleClose={mapReportCloseHandler}  id={id} meta={meta} />
            )}
        </div>
    )
}
export default AnalysisFiles;