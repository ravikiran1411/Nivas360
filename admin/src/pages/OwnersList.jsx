import { useEffect, useState } from "react";
import axios from "axios";
import {backendUrl} from "../App";
import { toast } from "react-toastify";

const OwnersList = ({adminToken})=>{

  const [owners,setOwners] = useState([]);

  const fetchOwners = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/admin/owners",{headers:{token:adminToken}});

      if (res.data.success) {
        setOwners(res.data.owners);
      }
    } 
    catch (err) {
      toast.error("Failed to fetch owners");
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const removeOwner = async (id) => {
    const res = await axios.post(backendUrl + "/api/admin/remove-owner",{userId:id},{headers:{token:adminToken}});

    if (res.data.success) {
      toast.success("Owner removed");
      fetchOwners();
    }
  };

  if (owners.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">No Owners Found</div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Owners</h2>

      {owners.map((item) => (
        <div key={item._id} className="bg-white shadow-lg rounded-xl p-6 mb-6 border hover:shadow-xl transition">
          <p><strong>Name:</strong>{item.name}</p>
          <p><strong>Email:</strong>{item.email}</p>

          <button className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700" onClick={() => removeOwner(item._id)}>
            Remove Owner
          </button>
        </div>
      ))}
    </div>
  );
};

export default OwnersList;
