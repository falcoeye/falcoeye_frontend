import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utility/axios-instance";
import "./Modals.css";
const AddCamera = ({ setAddCamera }) => {
  const user = useSelector((state) => state.user);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [showRSTP, setShowRSTP] = React.useState(false);
  const [data, setData] = useState({
    name: null,
    utm_x: null,
    utm_y: null,
    thumbnail: null,
    streaming_type: null,
    url: null,
    host: null,
    port: null,
    username: null,
    password: null,
  });

  const handleStreamingTypeChange = (e) => {
    handleChange(e);
    if (e.target.value === "RSTP") {
      setShowRSTP(true);
    } else {
      setShowRSTP(false);
    }
  };

  useEffect(() => {
    data.thumbnail === null ||
    data.name === null ||
    data.url === null ||
    data.streaming_type === "-"
      ? setDisableSubmit(true)
      : setDisableSubmit(false);
  }, [data.thumbnail, data.name, data.url, data.streaming_type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
    console.log(data);
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
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    data.thumbnail = base64;
    data.thumbnail === null ||
    data.name === null ||
    data.url === null ||
    data.streaming_type === "-"
      ? setDisableSubmit(true)
      : setDisableSubmit(false);
  };

  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    if (data.name === null || data.url === null) {
      toast.error("All fields are required!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        const res = await axios.post(
          "/camera/",
          {
            ...data,
          },
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        console.log(res);
        setAddCamera(false);
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
    <div className="modal_backdrop" onClick={() => setAddCamera(false)}>
      <div className="custom_modal_box" onClick={(e) => e.stopPropagation()}>
        <div className="cmb_heading">Add a Camera</div>
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
            id="utm_x"
            className="modal_form_input "
            name="utm_x"
            placeholder="x-cordinate"
            onChange={handleChange}
            value={data.utm_x}
          />
          <input
            type="number"
            id="utm_y"
            className="modal_form_input "
            name="utm_y"
            placeholder="y-cordinate"
            onChange={handleChange}
            value={data.utm_y}
          />
          <select
            id="streaming_type"
            className="modal_form_input "
            name="streaming_type"
            onChange={(e) => {
              handleStreamingTypeChange(e);
            }}
          >
            <option value="-">--SELECT--</option>
            <option value="RSTP">RSTP</option>
            <option value="STREAMINGSERVER">STREAMING SERVER</option>
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
          {showRSTP ? (
            <>
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
            </>
          ) : null}
          <div style={{ marginLeft: "85px" }}>
            <label for="thumbnail" className="image_upload_label">
              Upload Camera Thumbnail
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
                placeholder="Camera Thumbnail"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <input
            type="submit"
            style={{ marginLeft: "100px" }}
            className={`login_form_btn ${
              disableSubmit && "disable_submit_btn"
            }`}
            value="Add Camera"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default AddCamera;
