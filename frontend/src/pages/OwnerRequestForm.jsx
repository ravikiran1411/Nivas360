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

      const res = await axios.post(
        backendUrl + "/api/owner/request",
        formData,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (res.data.success) {
        toast.success("Request Submitted");
        navigate("/profile");
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Request failed");
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Request Owner Access
        </h2>

        <form onSubmit={submitHandler} className="flex flex-col gap-5">

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
            />
          </div>

          {/* Document Upload */}
          <div className="flex flex-col">

            <label className="text-sm font-semibold mb-1">
              Upload Property Document
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e)=>setDocument(e.target.files[0])}
              required
              className="border border-gray-300 rounded-lg p-2 cursor-pointer"
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >

            {loading ? "Submitting..." : "Submit Request"}

          </button>

        </form>

      </div>

    </div>

  );
};

export default OwnerRequestForm;