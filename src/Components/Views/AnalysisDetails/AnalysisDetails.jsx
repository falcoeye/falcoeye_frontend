import React from "react";
const AnalysisDetails = () => {
  return (
    <div className="bg-[#f5f9fc] p-6 h-full">
      <h3 className="text-[#1d2124] text-2xl mb-10">Analysis Details</h3>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center text-sm">
          <h4 className="text-gray-400 flex-1">Name:</h4>
          <h4 className="flex-1 sm:flex-[3]">FishCounter</h4>
        </div>

        <div className="flex items-center text-sm">
          <h4 className="text-gray-400 flex-1">Author:</h4>
          <h4 className="flex-1 sm:flex-[3]">Ridwan Jalali</h4>
        </div>

        <div className="flex items-center text-sm">
          <h4 className="text-gray-400 flex-1">Published Date:</h4>
          <h4 className="flex-1 sm:flex-[3]">19 Mar 2021</h4>
        </div>

        <div className="flex items-center text-sm">
          <h4 className="text-gray-400 flex-1">Backbone:</h4>
          <h4 className="flex-1 sm:flex-[3]">General Fish Detector</h4>
        </div>

        <div className="flex items-center text-sm">
          <h4 className="text-gray-400 flex-1">Training Dataset:</h4>
          <h4 className="flex-1 sm:flex-[3]">
            KAUST ViewIntoTheBlue Static Camera
          </h4>
        </div>

        <div className="flex items-center text-sm">
          <h4 className="text-gray-400 flex-1">Speed:</h4>
          <h4 className="flex-1 sm:flex-[3]">1frame/s</h4>
        </div>

        <div className="flex items-center text-sm">
          <h4 className="text-gray-400 flex-1">Media:</h4>
          <h4 className="flex-1 sm:flex-[3]">Stream: continous sampling</h4>
        </div>

        <div className="flex items-center text-sm">
          <h4 className="text-gray-400 flex-1">Used for:</h4>
          <h4 className="flex-1 sm:flex-[3]">
            Monitoring fish crowd in certain location over several time
            intervals to compare the crowd over daytime, days, weeks, months and
            seasons.
          </h4>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-[#1d2124] text-2xl mb-10">Description</h3>
        <h4 className="text-sm mb-8">
          This model counts the number of fish in the sight of the view
        </h4>

        <div className="flex  text-sm">
          <h4 className="text-gray-400 flex-1">Consideration:</h4>
          <h4 className="flex-1 sm:flex-[3]">
            <ul className="flex flex-col list-inside list-disc gap-1 text-sm">
              <li>A single fish can be counted more than once</li>
              <li>
                Depending on the interval, fish might not be observed and
                counted
              </li>
              <li>Fish must be within close proximity</li>
              <li>Underwater visibility </li>
            </ul>
          </h4>
        </div>

        <div className="flex  text-sm mt-4">
          <h4 className="text-gray-400 flex-1">Assumptions:</h4>
          <p className="flex-1 sm:flex-[3] text-sm">
            For the stream, depending on the interval, the sampling rate is
            going to be a frame per second or slower
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetails;
