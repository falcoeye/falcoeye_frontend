import Lottie from "lottie-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import noDataAnimation from "../../assets/animations/no-data.json";
import Layout from "../../Components/Layout";
import Loader from "../../Components/UI/Loader/Loader";
import fish from "../../images/fish4.jpg";
import AddAnalysis from "../Modals/AddAnalysis";
import AnalysisFilterbar from "./AnalysisFilterbar";
import { DUMMY_DATA } from "./DUMMY_DATA";

const AllAnalysis = () => {
  const isError = useSelector((state) => state.analysis.error);
  const isLoading = useSelector((state) => state.analysis.isLoading);
  // const dispatch = useDispatch();

  const [analysisData, setAnalysisData] = useState([...DUMMY_DATA]);
  const [searchInput, setSearchInput] = useState("");
  const [alanysisStatus, setAlanysisStatus] = useState("all");

  const [addAnalysisModal, setAddAnalysisModal] = useState(false);

  const openAddAnalysisModalHandler = () => setAddAnalysisModal(true);
  const closeAddAnalysisModalHandler = () => setAddAnalysisModal(false);

  const analysisStatusChangeHandler = (e) => {
    const status = e.target.value;
    setAlanysisStatus(status);

    if (status === "all") {
      setAnalysisData([...DUMMY_DATA]);
    } else {
      setAnalysisData(DUMMY_DATA.filter((item) => item.status === status));
    }
  };

  const searchInputChangeHandler = (e) => {
    const value = e.target.value;
    setSearchInput(e.target.value);

    if (value) {
      setAnalysisData((prevState) =>
        prevState.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setAnalysisData([...DUMMY_DATA]);
    }
  };

  // useEffect(() => {
  //   dispatch(fetchAnalysisData());
  // }, [dispatch]);

  let content;

  if (isLoading && !isError) {
    content = <Loader />;
  }

  if (isError && !isLoading) {
    content = (
      <div className="h-96">
        <Lottie
          animationData={noDataAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  // if(!isError && !isLoading){
  if (analysisData.length === 0) {
    content = (
      <div className="h-96">
        <Lottie
          animationData={noDataAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  } else {
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
                  {analysisData.map((file) => {
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
                          <div className="">
                            <div className="text-sm font-medium text-gray-900">
                              {file.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {file.created_at}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${statusStyle} capitalize `}>
                            {file.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="btn-primary">view details</button>
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
  // }

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
    </>
  );
};

export default AllAnalysis;
