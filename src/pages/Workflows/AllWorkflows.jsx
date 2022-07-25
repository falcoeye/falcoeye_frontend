import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fish from "../../images/fish3.jpeg";
import LoadingSpinner from "../Auth/components/LoadingSpinner";
import WorkflowCard from "./WorkflowCard";
import AiFilterBar from "./WorkflowsFilterBar";
import axios from "../../utility/api-instance";
import { workflowsActions } from "../../store/workflows";
import { toast } from "react-toastify";

export const cardList = [
  {
    id: 1,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan1",
    date: "20 dec 2021",
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
  {
    id: 2,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan2",
    date: "20 dec 2021",
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
  {
    id: 3,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan3",
    date: "20 dec 2021",
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
  {
    id: 4,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan4",
    date: "20 dec 2021",
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
  {
    id: 5,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan5",
    date: "20 dec 2021",
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
  {
    id: 6,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan6",
    date: "20 dec 2021",
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
];

const AllWorkflows = () => {
  const dispatch = useDispatch();
  const workflowsData = useSelector((state) => state.workflows.data);

  useEffect(() => {
    axios
      .get("/workflow/")
      .then((response) => {
        dispatch(workflowsActions.fetchworkflows(response.data.workflow));
      })
      .catch((err) => {
        const errorMessage = err.response.data.msg || err.response.data.message;
        toast.error(errorMessage || "Something went wrong!", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
  }, [dispatch]);

  if (workflowsData.length === 0) {
    return (
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5 text-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5">
          <h3 className="text-[#525252] capitalize  text-xl flex items-center gap-5 pb-5 border-b border-[#f5f5f5] mb-4">
            Workflows
          </h3>
          <AiFilterBar />

          {/* <div className="flex items-center gap-5 mt-5">
            <button className="bg-gray-100 rounded-full border border-gray-50 text-xs px-2 py-1">
              Top
            </button>
            <button className="bg-gray-100 rounded-full border border-gray-50 text-xs px-2 py-1">
              New
            </button>
            <button className="bg-gray-100 rounded-full border border-gray-50 text-xs px-2 py-1">
              Greatest
            </button>
          </div> */}

          <div className=" grid md:grid-cols-3 sm:grid-cols-1 gap-4 mt-8">
            {workflowsData.map((i, index) => (
              <WorkflowCard
                key={i.id}
                img={i.creator}
                name={i.creator}
                date={i.publish_date}
                title={i.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllWorkflows;
