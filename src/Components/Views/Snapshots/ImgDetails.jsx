import { BiSave } from "react-icons/bi";
import React from "react";
const ImgDetails = () => {
  return (
    <div className="bg-[#f5f9fc] px-5 py-6">
      <div className="mb-8">
        <h3 className="mb-4 px-2">Image Title*</h3>
        <div className="bg-white border border-[#dfe7ea] px-4 py-2 rounded-md text-xs">
          Count number of Fish on sight of view
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 px-2">Description</h3>
        <textarea className="bg-white border focus:outline-none border-[#dfe7ea] px-4 py-2 rounded-md text-xs w-full resize-none min-h-[140px]"></textarea>
      </div>
      <div>
        <h4 className="text-black text-xs mb-2">
          Tags <span className="text-gray-400">(maximum 30)</span>
        </h4>

        <div className="bg-white border border-[#dfe7ea] px-3 py-2 rounded text-xs">
          <button className="bg-[#d1e8f3] text-[10px] px-2 rounded-md flex items-center gap-2">
            illustration <span>x</span>
          </button>
        </div>

        <p className="text-xs mt-2 mb-8">
          Suggested:{" "}
          <span className="text-primary">
            graphics, ui/ux, z, flat, background, business design, logo
          </span>
        </p>

        <div className="flex items-center gap-2 text-xs mb-8">
          <input type={`checkbox`} />
          <p>Allow user to save their lorem ipsum is dummy text</p>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <button className="border-primary hover:bg-primary hover:text-white rounded-full px-4 py-2 text-primary border text-xs capitalize ">
            refress
          </button>

          <button className="btn-primary">
            <span className="text-base">
              <BiSave />
            </span>
            save as draft
          </button>

          <button className="btn-primary">
            <span className="text-base">
              <BiSave />
            </span>
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImgDetails;
