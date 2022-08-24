import Lottie from "lottie-react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noDataAnimation from "../../assets/animations/no-data.json";
import Loader from "../../Components/UI/Loader/Loader";
import { fetchAnalysisData } from "../../store/analysis";
import ShowAnalysis from "../Modals/ShowAnalysis";
import AnalysisFilterbar from "./AnalysisFilterbar";
import AnalysisRow from "./AnalysisRow";

const AnalysisList = (props) => {
  const isLoading = useSelector((state) => state.analysis.isLoading);
  const analysises = useSelector((state) => state.analysis.data);
  const dispatch = useDispatch();

  const [filteredAnalysises, setFilteredAnalysises] = useState(analysises);
  const [searchInput, setSearchInput] = useState("");
  const [alanysisStatus, setAlanysisStatus] = useState("all");

  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const [analysisData, setAnalysisData] = useState(null);
  const [loadingAnalysisData, setLoadingAnalysisData] = useState(true);

  const loadingAnalysisDataHandler = (value) => setLoadingAnalysisData(value);
  const getAnalysisDataHandler = (data) => setAnalysisData(data);
  const clearAnalysisDataHandler = (data) => setAnalysisData(null);

  const openShowAnalysisModalHandler = (id) => {
    setShowAnalysisModal(true);
  };
  const closeShowAnalysisModalHandler = () => setShowAnalysisModal(false);

  const analysisStatusChangeHandler = (e) => {
    setAlanysisStatus(e.target.value);
  };

  const searchInputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchAnalysisData());
  }, [dispatch]);

  const searchFilter = (term, items) => {
    if (term.length === 0) return items;
    const searchFilteredData = items.filter((item) => {
      return item.name.toLowerCase().includes(term.toLowerCase());
    });
    return searchFilteredData;
  };

  const typeFilter = (type, items) => {
    switch (type) {
      case "all":
        return items;
      default:
        return items.filter((item) => item.status === type);
    }
  };

  const filterationHandler = useCallback(() => {
    let filteredData = [...analysises];
    const searchFilteredResults = searchFilter(searchInput, filteredData);
    const typeFiltersResults = typeFilter(
      alanysisStatus,
      searchFilteredResults
    );
    setFilteredAnalysises(typeFiltersResults);
  }, [alanysisStatus, analysises, searchInput]);

  useEffect(() => {
    if (analysises.length >= 0) {
      filterationHandler();
    }
  }, [analysises, filterationHandler]);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (filteredAnalysises.length === 0 && !isLoading) {
    content = (
      <div className="h-96 mt-6">
        <Lottie
          animationData={noDataAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  } else if (filteredAnalysises.length > 0 && !isLoading) {
    content = (
      <div className="flex flex-col px-4 mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-4 ">
            <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-800 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-white dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    ></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    >
                      status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredAnalysises.map((file) => (
                    <AnalysisRow
                      key={file.id}
                      file={file}
                      onOpenAnalysisModal={openShowAnalysisModalHandler}
                      onGetAnalysisData={getAnalysisDataHandler}
                      onLoadingAnalysisData={loadingAnalysisDataHandler}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <AnalysisFilterbar
        onSearchInputChange={searchInputChangeHandler}
        searchInput={searchInput}
        onAnalysisStatusChange={analysisStatusChangeHandler}
        alanysisStatus={alanysisStatus}
      />
      {content}

      {showAnalysisModal && (
        <ShowAnalysis
          handleClose={closeShowAnalysisModalHandler}
          open={showAnalysisModal}
          analysisData={analysisData}
          loadingAnalysisData={loadingAnalysisData}
          id={analysisData?.analysis?.id}
          onClearAnalysisData={clearAnalysisDataHandler}
        />
      )}
    </Fragment>
  );
};
export default AnalysisList;
