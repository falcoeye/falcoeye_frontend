import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
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
const RSTPFields = [
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
  "thumbnail",
];

const EditSource = ({ handleClose, id, open }) => {
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
    thumbnail: null,
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
        : RSTPFields;
    let hasNull = false;
    dataFields.forEach((key) => {
      if (data[key] === null || data[key] === "") {
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
    if (e.target.value === "RSTP") {
      // setShowRSTP(true);
    } else {
      // setShowRSTP(false);
    }
  };
  const convertBase64 = (file) => {
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
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setData((preVal) => {
      return {
        ...preVal,
        thumbnail: base64,
      };
    });
    data.thumbnail = base64;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendingRequest(true);
    try {
      const dataFields =
        data.streaming_type === "StreamingServer"
          ? streaminServerFields
          : RSTPFields;
      let sentData = {};
      dataFields.forEach((field) => {
        sentData[field] = data[field];
      });
      const res = await axios.put(`/camera/${id}`, sentData);
      dispatch(editSource(res.data.camera));
      setSendingRequest(false);
      handleClose();
    } catch (error) {
      setErrorMessage(error.response.data.message || "Something went wrong");
      if (error.response.data.errors) {
        let errorObjectKeys = Object.keys(error.response.data.errors);
        errorObjectKeys.forEach((key) => {
          toast.error(`${key}: ${error.response.data.errors[`${key}`]}`);
        });
      }
      setSendingRequest(false);
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[300]" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="cmb_heading">Edit a Source</div>
                <form>
                  <input
                    type="text"
                    id="name"
                    className="modal_form_input"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={data.name}
                  />
                  <input
                    type="number"
                    id="latitude"
                    className="modal_form_input "
                    name="latitude"
                    placeholder="longitude"
                    onChange={handleChange}
                    value={data.latitude}
                  />
                  <input
                    type="number"
                    id="longitude"
                    className="modal_form_input "
                    name="longitude"
                    placeholder="latitude"
                    onChange={handleChange}
                    value={data.longitude}
                  />
                  <select
                    id="streaming_type"
                    className="modal_form_input "
                    name="streaming_type"
                    value={data.streaming_type}
                    onChange={(e) => {
                      handleStreamingTypeChange(e);
                    }}
                  >
                    <option value="-">--TYPE--</option>
                    <option disabled value="RSTP">
                      RSTP
                    </option>
                    <option value="StreamingServer">STREAMING SERVER</option>
                  </select>
                  <input
                    type="text"
                    id="url"
                    className="modal_form_input "
                    name="url"
                    placeholder="url"
                    onChange={handleChange}
                    value={data.url}
                  />
                  {data.streaming_type === "RSTP" && (
                    <Fragment>
                      <input
                        type="text"
                        id="host"
                        className="modal_form_input "
                        name="host"
                        placeholder="host"
                        onChange={handleChange}
                        value={data.host}
                      />

                      <input
                        type="number"
                        id="port"
                        className="modal_form_input "
                        name="port"
                        placeholder="port"
                        onChange={handleChange}
                        value={data.port}
                      />

                      <input
                        type="text"
                        id="username"
                        className="modal_form_input "
                        name="username"
                        placeholder="username"
                        onChange={handleChange}
                        value={data.username}
                      />
                      <input
                        type="password"
                        id="password"
                        className="modal_form_input "
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        value={data.password}
                      />
                      <div>
                        <label
                          htmlFor="thumbnail"
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
                            id="thumbnail"
                            accept="image/*"
                            className="modal_form_input "
                            name="thumbnail"
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
