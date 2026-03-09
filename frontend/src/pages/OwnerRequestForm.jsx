import { useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OwnerRequestForm = () => {

  const { backendUrl, token } = useContext(DataContext);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!document) {
    toast.error("Upload image");
    return;
  }
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("document", document);

    try {
      setLoading(true);
      const res = await axios.post(backendUrl + "/api/owner/request", formData,
        { headers: {token: token, "Content-Type": "multipart/form-data"} });

      if (res.data.success) {
        toast.success("Request Submitted");
        navigate("/profile");
      } 
      else {
        toast.error(res.data.message);
      }
  } 
  catch (error) {
    console.log(error);
    toast.error("Request failed");
  }

  setLoading(false);
};

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-6">
        Request Owner Access
      </h2>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <input type="text" placeholder="Phone Number" value={phone}
          onChange={(e)=>setPhone(e.target.value)} required />

        <input type="file" accept="image/*"
          onChange={(e)=>setDocument(e.target.files[0])} required />

        <button type="submit" disabled={loading} className="bg-black text-white py-2 rounded" >
          {loading ? "Submitting..." : "Submit Request"}
        </button>

      </form>
    </div>
  );
};

export default OwnerRequestForm;