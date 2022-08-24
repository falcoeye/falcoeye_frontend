import React from "react";
import Layout from "../../Components/Layout";

export default function Settings() {
  return (
    <Layout>
      <div className=" mr-5 px-4  smin-h-[500px]">
        <div className="flex justify-between mb-4">
          <div className="pt-5 ">
            <h1 className="text-gray-900 text-lg font-medium dark:text-white">
              Settings
            </h1>
          </div>
        </div>

        <div>
          <div>
            <label className="setting-label dark:text-gray-100">Camera</label>
            <select
              id="location"
              name="location"
              className="setting-input dark:!bg-gray-700 dark:!border-gray-700 dark:!text-white "
              defaultValue="Camera name DSLR"
            >
              <option>Camera name DSLR</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
          <div>
            <label className="setting-label dark:text-gray-100">
              Coordinates
            </label>
            <select
              id="location"
              name="location"
              className="setting-input dark:!bg-gray-700 dark:!border-gray-700 dark:!text-white"
              defaultValue="Camera name DSLR"
            >
              <option>Camera name DSLR</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
          <div>
            <label className="setting-label dark:text-gray-100">
              City Name
            </label>
            <select
              id="location"
              name="location"
              className="setting-input dark:!bg-gray-700 dark:!border-gray-700 dark:!text-white"
              defaultValue="Camera name DSLR"
            >
              <option>Camera name DSLR</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
          <div className="mt-8">
            <h2 className="text-lg text-gray-900 font-medium dark:text-white">
              How you look and sound
            </h2>
            <p className="text-gray-900 text-sm mt-2 dark:text-gray-100">
              Record video and take snapshot. No one else will see it, since it
              is not saved on studio.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
