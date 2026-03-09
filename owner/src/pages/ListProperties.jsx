import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListProperties = () => {

  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch owner properties
  const fetchData = async () => {
    try {
      const res = await axios.get(
        backendUrl + "/api/owner/properties",
        { headers: { token } }
      );

      if (res.data.success) {
        setList(res.data.properties);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete property
  const deleteProperty = async (id) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/owner/remove-property",
        { propertyId: id },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Property Removed Successfully");
        fetchData(); // refresh list
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">

      {list.length === 0 && (
        <p className="text-gray-500">No Properties Added Yet</p>
      )}

      {list.map((item) => (
        <div key={item._id} className="border p-4 rounded bg-white">

          {/* Property Title */}
          <h3 className="font-bold text-lg mb-2">{item.title}</h3>

          {/* Price */}
          <p className="mb-1">
            <span className="font-semibold">Price:</span> ₹{item.price}
          </p>

          {/* Availability */}
          <p className="mb-3">
            <span className="font-semibold">Availability:</span> {item.availability}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">

            <button
              onClick={() => navigate("/edit/" + item._id)}
              className="bg-black text-white px-4 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => deleteProperty(item._id)}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Remove
            </button>

          </div>

        </div>
      ))}

    </div>
  );
};

export default ListProperties;