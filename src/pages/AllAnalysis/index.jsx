import Lottie from "lottie-react";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noDataAnimation from "../../assets/animations/no-data.json";
import Layout from "../../Components/Layout";
import Loader from "../../Components/UI/Loader/Loader";
import fish from "../../images/fish4.jpg";
import { fetchAnalysisData } from "../../store/analysis";
import AddAnalysis from "../Modals/AddAnalysis/AddAnalysis";
import ShowAnalysis from "../Modals/ShowAnalysis";
import AnalysisFilterbar from "./AnalysisFilterbar";

const AllAnalysis = () => {
  const isLoading = useSelector((state) => state.analysis.isLoading);
  const analysises = useSelector((state) => state.analysis.data);
  const dispatch = useDispatch();

  const [filteredAnalysises, setFilteredAnalysises] = useState(analysises);
  const [searchInput, setSearchInput] = useState("");
  const [alanysisStatus, setAlanysisStatus] = useState("all");

  const [addAnalysisModal, setAddAnalysisModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [analysisId, setAnalysId] = useState("");

  const openAddAnalysisModalHandler = () => setAddAnalysisModal(true);
  const closeAddAnalysisModalHandler = () => setAddAnalysisModal(false);

  const openShowAnalysisModalHandler = (id) => {
    setAnalysId(id);
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

  const searchFilter = ( term, items ) => {
    if ( term.length === 0 ) return items;
    const searchFilteredData = items.filter( item => {
      return item.name.toLowerCase().includes(term.toLowerCase())
    } )
    return searchFilteredData
  }

  const typeFilter = ( type, items ) => {
    switch ( type ) {
      case 'all' : return items
      default : 
        return items.filter( item => item.status === type)
    }
  }

  const filterationHandler = useCallback(() => {
    let filteredData = [...analysises]
    const searchFilteredResults = searchFilter(searchInput,filteredData)
    const typeFiltersResults = typeFilter( alanysisStatus, searchFilteredResults )
    setFilteredAnalysises(typeFiltersResults)
  }, [alanysisStatus, analysises, searchInput])

  useEffect(() =>{
    if ( analysises.length > 0) {
      filterationHandler()
    } 
  }, [analysises, filterationHandler] )

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (filteredAnalysises.length === 0 && !isLoading) {
    content = (
      <div className="h-96">
        <Lottie
          animationData={noDataAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  } else if  (  filteredAnalysises.length > 0 && !isLoading ) {
    content = (
      <div className="flex flex-col px-4 mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-4 ">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAnalysises.map((file) => {
                    let statusStyle = "";
                    if (file.status === "active") {
                      statusStyle = "text-primary";
                    }
                    if (file.status === "error") {
                      statusStyle = "text-[#c16a7b]";
                    }
                    if (file.status === "done") {
                      statusStyle = "text-[#74ab96]";
                    }
                    return (
                      <tr key={file.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="max-w-[120px] min-w-[80px] rounded-t-md rounded-br-md overflow-hidden">
                              <img className="w-full" src={fish} alt="files" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {file.name}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {moment.utc(file.created_at).format('MM-DD-YYYY')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${statusStyle} capitalize `}>
                            {file.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="btn-primary"
                            onClick={() =>
                              openShowAnalysisModalHandler(file.id)
                            }
                          >
                            view details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout>
        <div className="main-container">
          <div className="bg-white mt-5 rounded-[10px] p-5">
            <div className="flex justify-between md:items-center sm:flex-row flex-col mb-4 border-b border-[#f5f5f5] pb-5">
              <h3 className="text-[#525252] capitalize  text-xl">Analysis</h3>

              <button
                type="button"
                className="flex gap-5 sm:pt-0 pt-4"
                onClick={openAddAnalysisModalHandler}
              >
                <span className="bg-primary text-white text-sm py-2  flex justify-center items-center md:px-4 px-3 md:rounded-3xl rounded-full">
                  <span className="capitalize"> Add analysis</span>
                </span>
              </button>
            </div>
            <AnalysisFilterbar
              onSearchInputChange={searchInputChangeHandler}
              searchInput={searchInput}
              onAnalysisStatusChange={analysisStatusChangeHandler}
              alanysisStatus={alanysisStatus}
            />

            {content}
          </div>
        </div>
      </Layout>

      <AddAnalysis
        handleClose={closeAddAnalysisModalHandler}
        open={addAnalysisModal}
      />
      <ShowAnalysis
        handleClose={closeShowAnalysisModalHandler}
        open={showAnalysisModal}
        id={analysisId}
      />
    </>
  );
};

export default AllAnalysis;
