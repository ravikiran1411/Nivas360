import { useEffect, useState } from "react";
import axios from "axios";
import {backendUrl} from "../App";
import {toast} from "react-toastify";

const PendingRequests = ({adminToken})=>{

  const [requests,setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get(backendUrl + "/api/admin/pending", {headers:{token:adminToken}});

    if (res.data.success) {
      setRequests(res.data.requests);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id) => {
    const res = await axios.post(backendUrl + "/api/admin/approve",{requestId:id}, {headers:{token:adminToken}});

    if (res.data.success) {
      toast.success("Approved");
      fetchRequests();
    }
  };

  const reject = async (id) => {
    const res = await axios.post(backendUrl + "/api/admin/reject",{requestId:id}, {headers:{token:adminToken}});

    if (res.data.success) {
      toast.success("Rejected");
      fetchRequests();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      {requests.map((item) => (
        <div className="bg-white shadow-md rounded p-5 mb-4" key={item._id}>

          <p><strong>Name:</strong>{item.userId.name}</p>
          <p><strong>Email:</strong>{item.userId.email}</p>
          <p><strong>Phone:</strong>{item.phone}</p>

          <a className="text-blue-600 underline" href={item.document} target="_blank" rel="noreferrer">
            View Document
          </a>

          <div className="mt-4 flex gap-4">
            <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={() => approve(item._id)} >
              Approve
            </button>

            <button className="bg-red-600 text-white px-4 py-1 rounded" onClick={() => reject(item._id)}>
              Reject
            </button>
          </div>

        </div>
      ))}

    </div>
  );
};

export default PendingRequests;
