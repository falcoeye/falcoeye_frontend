import React from "react";
import { ImCross } from "react-icons/im";

export default function Setting() {
  return (
    <div className=" mr-5 px-4 rounded-lg shadow-xl min-h-[500px]">
      <div className="flex justify-between mb-4">
        <div className="pt-5 ">
          <h1 className="text-gray-900 text-lg font-medium">Settings</h1>
        </div>
        <div className="pt-5">
          <ImCross />
        </div>
      </div>

      <div>
        <div>
          <label className="setting-label">Camera</label>
          <select
            id="location"
            name="location"
            className="setting-input"
            defaultValue="Camera name DSLR"
          >
            <option>Camera name DSLR</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
        <div>
          <label className="setting-label">Coordinates</label>
          <select
            id="location"
            name="location"
            className="setting-input"
            defaultValue="Camera name DSLR"
          >
            <option>Camera name DSLR</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
        <div>
          <label className="setting-label">City Name</label>
          <select
            id="location"
            name="location"
            className="setting-input"
            defaultValue="Camera name DSLR"
          >
            <option>Camera name DSLR</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
        <div className="mt-8">
          <h2 className="text-lg text-gray-900 font-medium">
            How you look and sound
          </h2>
          <p className="text-gray-900 text-sm mt-2">
            Record video and take snapshot. No one else will see it, since it is
            not saved on studio.
          </p>
        </div>
      </div>
    </div>
  );
}
