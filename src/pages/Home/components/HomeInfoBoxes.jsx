import React, { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import AddAnalysis from "../../Modals/AddAnalysis/AddAnalysis";
import AddSource from "../../Modals/AddSource";
import UploadMedia from "../../Modals/UploadMedia";

const HomeInfoBoxes = () => {
  const [uploadMediaImage, setUploadMediaImage] = useState(false);
  const [addAnalysisModal, setAddAnalysisModal] = useState(false);
  const [addSourceOpened, setAddSourceOpened] = useState(false);

  const openAddAnalysisModalHandler = useCallback(
    () => setAddAnalysisModal(true),
    []
  );
  const closeAddAnalysisModalHandler = useCallback(
    () => setAddAnalysisModal(false),
    []
  );

  const openUploadMediaModalHandler = useCallback(
    () => setUploadMediaImage(true),
    []
  );
  const closeUploadMediaModalHandler = useCallback(
    () => setUploadMediaImage(false),
    []
  );

  const openSourceModalHandler = useCallback(() => {
    setAddSourceOpened(true);
  }, []);
  const closeSourceModalHandler = useCallback(() => {
    setAddSourceOpened(false);
  }, []);

  return (
    <>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 justify-items-center">
        <NavLink
          to="profile"
          className="shadow-lg rounded-md  dark:bg-gray-900 max-w-[370px] w-full h-32 flex justify-center items-center p-2"
        >
          <h3 className="font-semibold text-xl text-gray-600 text-center capitalize dark:text-gray-100">
            My account
          </h3>
        </NavLink>
        <div
          className="shadow-lg rounded-md  dark:bg-gray-900 max-w-[370px] w-full h-32 flex justify-center items-center p-2 cursor-pointer"
          onClick={openUploadMediaModalHandler}
        >
          <h3 className="font-semibold text-xl text-gray-600 text-center capitalize dark:text-gray-100">
            Upload media
          </h3>
        </div>
        <div
          className="shadow-lg rounded-md  dark:bg-gray-900 max-w-[370px] w-full h-32 flex justify-center items-center p-2 cursor-pointer"
          onClick={openAddAnalysisModalHandler}
        >
          <h3 className="font-semibold text-xl text-gray-600 text-center capitalize dark:text-gray-100">
            New analysis
          </h3>
        </div>
        <div
          className="shadow-lg rounded-md  dark:bg-gray-900 max-w-[370px] w-full h-32 flex justify-center items-center p-2 cursor-pointer"
          onClick={openSourceModalHandler}
        >
          <h3 className="font-semibold text-xl text-gray-600 text-center capitalize dark:text-gray-100">
            New Streaming Source
          </h3>
        </div>
      </div>

      {uploadMediaImage && (
        <UploadMedia
          handleClose={closeUploadMediaModalHandler}
          open={uploadMediaImage}
        />
      )}

      {addAnalysisModal && (
        <AddAnalysis
          handleClose={closeAddAnalysisModalHandler}
          open={addAnalysisModal}
        />
      )}

      {addSourceOpened && (
        <AddSource
          open={addSourceOpened}
          handleClose={closeSourceModalHandler}
        />
      )}
    </>
  );
};

export default HomeInfoBoxes;
