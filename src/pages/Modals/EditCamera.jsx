import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../axiosInstance";
import "./Modals.css";
const EditCamera = ({ setEditCamera,currentId }) => {
  const user = useSelector((state) => state.user);
 
  const [data, setData] = useState({
    url: null,
    currentId:null,
  });
 data.currentId = currentId;


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



  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    if ( data.url === null) {
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
        const res = await axios.put(
          `/camera/${data.currentId}`,
          {
            ...data,
          },
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        console.log(res)
        setEditCamera(false);
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
    <div className="modal_backdrop" onClick={() => setEditCamera(false)}>
      <div className="custom_modal_box" onClick={(e) => e.stopPropagation()}>
        <div className="cmb_heading">Edit Camera</div>
        <form>
 <input
            type="text"
            id="url"
            className="modal_form_input "
            name="url"
            placeholder="url"
            onChange={handleChange}
            value={data.url}
          />
        

          <input
            type="submit"
            style={{marginLeft:"100px"}}
            className={`login_form_btn`}
            value="Update"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default EditCamera;
