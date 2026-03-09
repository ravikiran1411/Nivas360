import { useEffect, useState } from "react";
import axios from "axios";
import {backendUrl} from "../App";
import { toast } from "react-toastify";

const ApprovedRequests = ({adminToken})=>{

  const [requests,setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/admin/approved",{headers:{token:adminToken}});

      if (res.data.success) {
        setRequests(res.data.requests);
      }
    } 
    catch (err) {
      toast.error("Failed to fetch approved requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">No Approved Requests</div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Approved Requests</h2>

      {requests.map((item) => (
        <div key={item._id} className="bg-green-50 border border-green-200 shadow rounded-xl p-6 mb-6" >
          <p><strong>Name:</strong>{item.userId.name}</p>
          <p><strong>Email:</strong>{item.userId.email}</p>
          <p><strong>Phone:</strong>{item.phone}</p>

          <a href={item.document} target="_blank" rel="noreferrer" className="text-blue-600 underline" >View Document</a>
        </div>
      ))}
    </div>
  );
};

export default ApprovedRequests;
