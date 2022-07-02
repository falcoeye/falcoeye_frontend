import React, { useState} from "react";
import { FaVideo, FaCamera } from "react-icons/fa";
import AddCamera from "../Modals/AddCamera";
function Map() {
  const [addCamera, setAddCamera] = useState(false);
  return (
    <div>
      {addCamera && <AddCamera setAddCamera={setAddCamera} />}
      <div className="main-container mt-6 ">
        <div className=" bg-white mx-1 pt-3 px-7 pb-7 rounded-sm">
          <div className="flex justify-between sm:flex-row flex-col">
            <div>
              <h2 className="text-gray-900 text-lg">Map View & All Cameras</h2>
            </div>
            <div className="flex gap-5 sm:pt-0 pt-4">
             
                <FaCamera className="md:hidden block" />
              <span onClick={() => setAddCamera(true)}
               className="bg-primary text-white text-sm py-2  flex justify-center items-center md:px-4 px-3 md:rounded-3xl rounded-full"
              
              >
                <span className="md:block hidden"> Add Camera</span></span>
             
              <a
                href="/"
                className="bg-green text-white text-sm md:py-2 py-3 flex justify-center items-center  md:px-4 px-3 md:rounded-3xl rounded-full"
              >
                <FaVideo className="md:hidden block" />
                <span className="md:block hidden">Start Streaming</span>
              </a>
            </div>
          </div>
          <div className="bg-backgroundLight py-4 pl-4 mt-6">
            <div className="flex items-center max-w-sm  bg-white  px-3 rounded-md">
              <span
                htmlFor="location"
                className="block text-sm font-medium text-primary whitespace-nowrap"
              >
                Sort by:
              </span>
              <select
                id="location"
                name="location"
                className="mt-1 block bg-white  w-full pl-1 pr-10 py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
              >
                <option>Select Camera Name</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15116851.731513908!2d31.46466915862869!3d22.329540411763947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e7b33fe7952a41%3A0x5960504bc21ab69b!2sSaudi%20Arabia!5e0!3m2!1sen!2s!4v1644942522788!5m2!1sen!2s"
                className="max-w-[1200px] rounded-md w-full h-[450px]"
                title="title"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
