import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSource } from "../../store/sources";
import { toast } from "react-toastify";
import axios from "../../utility/api-instance";
import "./Modals.css";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { Fragment } from "react";

const streaminServerFields = [ 'name', 'latitude', 'longitude', 'streaming_type', 'url', 'status' ]
const RSTPFields = [ 'name', 'latitude', 'longitude', 'streaming_type', 'url', 'status', 'host', 'port', 'user', 'password', 'thumbnail']

const AddSource = ({ handleSourceModal }) => {
  const dispatch = useDispatch()
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [ sendingRequest, setSendingRequest] = useState(false);
  const [ errorMessage, setErrorMessage] = useState(false);
  const [data, setData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    streaming_type: '',
    url: '',
    host: '',
    port: '',
    username: '',
    password: '',
    thumbnail: null,
    status: "RUNNING",
  });

  useEffect(() => {
    if(data.streaming_type === '' ) return;
    const dataFields = data.streaming_type === 'StreamingServer' ? streaminServerFields : RSTPFields
    let hasNull = false
    dataFields.forEach(key => {
      if(data[key] === null || data[key] === '') {
        hasNull = true
      } 
    })
    setDisableSubmit(hasNull)
  }, [data]);

  const handleStreamingTypeChange = (e) => {
    handleChange(e);
    if (e.target.value === "RSTP") {
      // setShowRSTP(true);
    } else {
      // setShowRSTP(false);
    }
  };


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
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
        thumbnail: base64
      }
    })
    data.thumbnail = base64;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendingRequest(true)
    try {
      const dataFields = data.streaming_type === 'StreamingServer' ? streaminServerFields : RSTPFields
      let sentData = {};
      dataFields.forEach( field => {
        sentData[field] = data[field]
      } )
      const res = await axios.post("/camera/",sentData);
      dispatch(addSource(res.data.camera))
      setSendingRequest(false)
      handleSourceModal(false);
    } catch (error) {
      setSendingRequest(false)
      setErrorMessage(error.response.data.message || 'Something went wrong')
      if (error.response.data.errors) {
        let errorObjectKeys = Object.keys(error.response.data.errors)
        errorObjectKeys.forEach( key => {
          toast.error(`${key}: ${error.response.data.errors[`${key}`]}`)
        } )
      }
    }
  };

  return (
    <div className="modal_backdrop" onClick={() => handleSourceModal(false)}>
      <div className="custom_modal_box" onClick={(e) => e.stopPropagation()}>
        <div className="cmb_heading">Add a Source</div>
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
            onChange={(e) => {
              handleStreamingTypeChange(e);
            }}
          >
            <option value="-">--TYPE--</option>
            <option disabled value="RSTP">RSTP</option>
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
            {data.streaming_type === 'RSTP' &&  (
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
                  <label htmlFor="thumbnail" className="image_upload_label" style={{margin: '5px auto'}}>
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
            ) }
          {errorMessage && <p className="error_text">{errorMessage}</p>}
          <button
            style={{ margin: "25px auto", display: 'block' }}
            className={`login_form_btn ${
              disableSubmit && "disable_submit_btn"
            }`}
            onClick={handleSubmit}
          >{sendingRequest ? <LoadingSpinner />  : "Add Source"}</button>
        </form>
      </div>
    </div>
  );
};

export default AddSource;
