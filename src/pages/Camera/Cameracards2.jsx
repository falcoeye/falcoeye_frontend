/* eslint-disable jsx-a11y/no-redundant-roles */
import { BsArrowRightCircle } from "react-icons/bs";
import React, { useState } from "react";
import useFetch from "../../hooks/UseFetch";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import EditCamera from "../Modals/EditCamera";
import axios from "../../utility/auth-instance";
import { toast } from "react-toastify";
function CamerCards2() {
  const user = useSelector((state) => state.user);
  const [editCamera, setEditCamera] = useState(false);
  const camerasList = useFetch("/camera/", {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const res = axios.delete(`/camera/${id}`, null, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        console.log(res);
      } catch (error) {
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="main-container ">
      <div className="bg-white mx-1 pt-9 px-7 pb-7 rounded-sm">
        <div className="overflow-x-scroll md:overflow-x-auto">
          <ul className="grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-2 sm:gap-x-3 min-w-max  ">
            {camerasList.response &&
              camerasList.response.data.camera.map((file) => (
                <li
                  key={file.source}
                  className=" flex items-center justify-between shadow-xl rounded-lg px-3"
                >
                  {editCamera && (
                    <EditCamera
                      setEditCamera={setEditCamera}
                      currentId={file.id}
                    />
                  )}
                  <div className=" flex items-center gap-2 ">
                    <div className="">
                      <img
                        src={file.source}
                        alt=""
                        className=" min-w-[100px] w-full max-w-[120px]  rounded-t-xl rounded-l-xl pointer-events-none "
                      />
                    </div>
                    <div className="px-2 pt-2 pb-8">
                      <h2 className="text-gray-900 text-base"> {file.name}</h2>
                      <p className="mt-1 block text-sm font-medium text-primary  pointer-events-none">
                        {file.subtitle}
                      </p>
                      <p className="block text-xs mt-1  font-medium text-primary pointer-events-none">
                        {file.publish_date}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div>
                      <span onClick={() => setEditCamera(true)}>
                        {" "}
                        <div className="text-primary text-xl ">
                          <AiTwotoneEdit />
                        </div>
                      </span>
                      <div
                        className="text-primary text-xl "
                        onClick={() => handleDelete(file.id)}
                      >
                        <AiFillDelete color="red" />
                      </div>{" "}
                      <br />
                    </div>
                    <Link to={"/Streaming/" + file.id}>
                      <BsArrowRightCircle className="text-primary text-xl" />
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CamerCards2;
