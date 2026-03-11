import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const {backendUrl, token, logout} = useContext(DataContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("none");

  const getProfile = async () => {
    const res = await axios.get(backendUrl + "/api/user/profile",{headers:{token}});

    if (res.data.success) {
      setUser(res.data.user);
    }

  };

  const getStatus = async () => {
    const res = await axios.get(backendUrl + "/api/owner/status",{headers:{token}});

    if (res.data.success) {
      setStatus(res.data.status);
    }

  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    getProfile();
    getStatus();
  }, [token]);

  if (!user){
    return null;
  }

  return (
    <div className="min-h-screen flex justify-center pt-24">
      <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          My Profile
        </h2>

        <div className="space-y-4">
          <div>
            <p className="font-medium">Name</p>
            <p className="text-gray-600">{user.name}</p>
          </div>

          <div>
            <p className="font-medium">Email</p>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div>
            <p className="font-medium">Role</p>
            <p className="text-gray-600 capitalize">{user.role}</p>
          </div>

        </div>

        <hr className="my-6" />

        {status === "none" && (
          <button onClick={() => navigate("/owner-request")}
              className="bg-blue-600 text-white py-2 px-6 rounded mx-auto block" >
            Request Owner Access
          </button>
        )}

        {status === "pending" && (
          <div className="text-yellow-600 text-center mb-4">
            Owner Request Pending
          </div>
        )}

        {status === "approved" && (
          <button onClick={() => navigate("/owner/properties")}
              className="bg-green-600 text-white py-2 px-6 rounded mx-auto block" >
            Go To Owner Dashboard
          </button>
        )}

        {status === "rejected" && (
          <div className="text-red-600 text-center mb-4">
            Owner Request Rejected
          </div>
        )}

        <button onClick={logout}   className="bg-red-400 mt-4 text-white py-2 px-6 rounded mx-auto block">
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;