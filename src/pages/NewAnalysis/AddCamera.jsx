import { AiFillCloseCircle } from "react-icons/ai";
import { BiSave, BiTimeFive } from "react-icons/bi";
import { BsCamera, BsInfoCircleFill } from "react-icons/bs";
import { IoCaretForwardCircleOutline } from "react-icons/io5";
import fish1 from "../../images/fish1.jpeg";
import React from "react";
const AddCamera = () => {
  return (
    <div className="bg-[#f5f9fc] px-8 md:px-14 py-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="lg:border-r">
          <div className="py-4 max-w-[400px]">
            <h3 className="mb-2 text-xl">Add Camera and video</h3>
            <p className="text-xs mb-4">
              Select videos from studio or add camera from your camera house
            </p>

            <div className="border border-[#daeaee] rounded-lg w-full min-h-[120px]  flex justify-center items-center">
              <button className="btn-primary">
                <span>
                  <BsCamera />
                </span>
                + Add Camera
              </button>
            </div>
            <div className="grid grid-cols-3 mt-8">
              <div className="relative cursor-pointer rounded-tl-lg rounded-br-lg ">
                <img
                  className="w-full h-full object-cover"
                  src={fish1}
                  alt="img"
                />
                <button className="text-[#fe4565] text-xl absolute -top-1 -right-1">
                  <AiFillCloseCircle />
                </button>
                <div className="absolute top-0 left-0 p-5 w-full h-full flex flex-col">
                  <div className=" absolute inset-0 text-white w-max h-max m-auto text-2xl">
                    <IoCaretForwardCircleOutline />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:px-16 py-4">
          <div>
            <div className="mb-8">
              <h3 className="mb-4 px-2 capitalize text-sm">interval*</h3>
              <div className="flex items-center w-full gap-5">
                <div className="bg-white border w-full   flex items-center justify-between border-[#dfe7ea] px-4 py-2 rounded-md text-xs">
                  <span>3:20 PM</span>
                  <span className="text-primary">
                    <BiTimeFive />
                  </span>
                </div>
                <div className="text-primary">
                  <BsInfoCircleFill />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 px-2 capitalize text-sm">start time*</h3>
              <div className="flex items-center w-full gap-5">
                <div className="bg-white border w-full   flex items-center justify-between border-[#dfe7ea] px-4 py-2 rounded-md text-xs">
                  <span>3:20 PM</span>
                  <span className="text-primary">
                    <BiTimeFive />
                  </span>
                </div>
                <div className="text-primary">
                  <BsInfoCircleFill />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 px-2 capitalize text-sm">end time*</h3>
              <div className="flex items-center w-full gap-5">
                <div className="bg-white border w-full   flex items-center justify-between border-[#dfe7ea] px-4 py-2 rounded-md text-xs">
                  <span>3:20 PM</span>
                  <span className="text-primary">
                    <BiTimeFive />
                  </span>
                </div>
                <div className="text-primary">
                  <BsInfoCircleFill />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="btn-primary">cancel</button>
              <button className="btn-primary">
                <span className="text-base">
                  <BiSave />
                </span>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCamera;
