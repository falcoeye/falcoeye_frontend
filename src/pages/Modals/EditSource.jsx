import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { editSource } from "../../store/sources";
import axios from "../../utility/api-instance";
import "./Modals.css";

const streaminServerFields = [
  "name",
  "latitude",
  "longitude",
  "streaming_type",
  "url",
  "status",
];
const RTSPFields = [
  "name",
  "latitude",
  "longitude",
  "streaming_type",
  "url",
  "status",
  "host",
  "port",
  "user",
  "password",
  "image",
];

const EditSource = ({ handleClose, id, open, handleShowClose }) => {
  const dispatch = useDispatch();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const sources = useSelector((state) => state.sources);

  const [data, setData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    streaming_type: "",
    url: "",
    host: "",
    port: "",
    username: "",
    password: "",
    image: null,
    status: "RUNNING",
  });

  useEffect(() => {
    if (!id) return;
    let sourceData = sources.data.find((item) => item.id === id);
    setData(sourceData);
  }, [id, sources.data]);

  useEffect(() => {
    if (!id) return;
    const dataFields =
      data.streaming_type === "StreamingServer"
        ? streaminServerFields
        : RTSPFields;
    let hasNull = false;
    const unrequiredFields = ['image', 'latitude','longitude']
    dataFields.forEach((key) => {
      if (data[key] === "" && !unrequiredFields.includes(key)) {
        hasNull = true;
      }
    });
    setDisableSubmit(hasNull);
  }, [id, data]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setData((preVal) => {
        return {
          ...preVal,
          [name]: +value,
        };
      });
      return;
    }
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const handleStreamingTypeChange = (e) => {
    handleChange(e);
    if (e.target.value === "RTSP") {
      // setShowRTSP(true);
    } else {
      // setShowRTSP(false);
    }
  };
  const convertToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const getBase64StringFromDataURL = (dataURL) => {
    return dataURL.replace("data:", "").replace(/^.+,/, "");
  };

  const handleImageUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    const dataUrl = await convertToDataURL(file);
    // Convert to Base64 string
    const base64 = getBase64StringFromDataURL(dataUrl);
    setData((preVal) => {
      return {
        ...preVal,
        image: base64,
      };
    });
    //data.thumbnail = base64;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendingRequest(true);
    try {
      const dataFields =
        data.streaming_type === "StreamingServer"
          ? streaminServerFields
          : RTSPFields;
      let sentData = {};
      dataFields.forEach((field) => {
        data[field] !== '' && (sentData[field] = data[field]);
      });
      const res = await axios.put(`/camera/${id}`, sentData);
      dispatch(editSource(res.data.camera));
      handleClose();
      handleShowClose();
      toast.success("Source has been updated successfully");
    } catch (error) {
      setSendingRequest(false);
      setErrorMessage(error.response.data.message || "Something went wrong");
      if (error.response.data.errors) {
        let errorObjectKeys = Object.keys(error.response.data.errors);
        errorObjectKeys.forEach((key) => {
          toast.error(`${key}: ${error.response.data.errors[`${key}`]}`);
        });
      }
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[460]" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="cmb_heading">Edit a Source</div>
                <form>
                  <input
                    type="text"
                    id="name"
                    className="modal_form_input dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={data.name}
                  />
                  <input
                    type="number"
                    id="latitude"
                    className="modal_form_input  dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                    name="latitude"
                    placeholder="longitude"
                    onChange={handleChange}
                    value={data.latitude}
                  />
                  <input
                    type="number"
                    id="longitude"
                    className="modal_form_input  dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                    name="longitude"
                    placeholder="latitude"
                    onChange={handleChange}
                    value={data.longitude}
                  />
                  <select
                    id="streaming_type"
                    className="modal_form_input  dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                    name="streaming_type"
                    value={data.streaming_type}
                    onChange={(e) => {
                      handleStreamingTypeChange(e);
                    }}
                  >
                    <option value="-">--TYPE--</option>
                    <option value="RTSP">RTSP</option>
                    <option value="StreamingServer">STREAMING SERVER</option>
                  </select>
                  <input
                    type="text"
                    id="url"
                    className="modal_form_input  dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                    name="url"
                    placeholder="url"
                    onChange={handleChange}
                    value={data.url}
                  />
                  {data.streaming_type === "RTSP" && (
                    <Fragment>
                      <input
                        type="text"
                        id="host"
                        className="modal_form_input dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                        name="host"
                        placeholder="host"
                        onChange={handleChange}
                        value={data.host}
                      />
                      <input
                        type="number"
                        id="port"
                        className="modal_form_input dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                        name="port"
                        placeholder="port"
                        onChange={handleChange}
                        value={data.port}
                      />
                      <input
                        type="text"
                        id="username"
                        className="modal_form_input dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                        name="username"
                        placeholder="username"
                        onChange={handleChange}
                        value={data.username}
                      />
                      <input
                        type="password"
                        id="password"
                        className="modal_form_input dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        value={data.password}
                      />
                      <div>
                        <label
                          htmlFor="image"
                          className="image_upload_label"
                          style={{ margin: "5px auto" }}
                        >
                          Upload Source Thumbnail
                          <input
                            style={{
                              visibility: "hidden",
                              position: "absolute",
                              zIndex: "-1",
                            }}
                            type="file"
                            id="image"
                            accept="image/*"
                            className="modal_form_input dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                            name="image"
                            placeholder="Source Thumbnail"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    </Fragment>
                  )}
                  {errorMessage && <p className="error_text">{errorMessage}</p>}
                  <button
                    style={{ margin: "25px auto", display: "block" }}
                    className={`login_form_btn ${
                      disableSubmit && "disable_submit_btn"
                    }`}
                    onClick={handleSubmit}
                  >
                    {sendingRequest ? <LoadingSpinner /> : "Edit Source"}
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditSource;
