import React, { useState } from 'react';
import Layout from '../../Components/Layout';
import AddAnalysis from '../Modals/AddAnalysis/AddAnalysis';
import AnalysisList from './AnalysisList';

const Analysis = () => {
  const [addAnalysisModal, setAddAnalysisModal] = useState(false);

  const openAddAnalysisModalHandler = () => setAddAnalysisModal(true);
  const closeAddAnalysisModalHandler = () => setAddAnalysisModal(false);

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
            <AnalysisList />
          </div>
        </div>
      </Layout>
      {addAnalysisModal && (
        <AddAnalysis
          handleClose={closeAddAnalysisModalHandler}
          open={addAnalysisModal}
        />
      )}
    </>
  );
};

export default Analysis;
