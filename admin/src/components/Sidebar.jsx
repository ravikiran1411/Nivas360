import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {backendUrl} from "../App";

const Sidebar = ({adminToken})=>{

  const [stats,setStats] = useState({
    pendingCount:0,
    approvedCount:0,
    newTodayCount:0
  });

  const fetchStats = async () => {
    const res = await axios.get(backendUrl + "/api/admin/stats",{headers:{token:adminToken}});

    if (res.data.success) {
      setStats(res.data.stats);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="w-[20%] min-h-screen bg-white shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>
      <div className="flex flex-col gap-4">
        <NavLink to="/pending" className="flex justify-between items-center bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition">
          <span>Pending Requests</span>
          <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">{stats.pendingCount}</span>
        </NavLink>

        <NavLink to="/approved" className="flex justify-between items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition" >
          <span>Approved</span>
          <span className="bg-gray-700 text-white px-2 py-1 text-xs rounded-full">{stats.approvedCount}</span>
        </NavLink>

        <NavLink to="/owners" className="flex justify-between items-center bg-green-100 p-3 rounded-lg hover:bg-green-200 transition" >
          <span>Owners</span>
        </NavLink>

      </div>

      <div className="mt-10 bg-red-50 border border-red-200 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-600">New Today</p>
        <p className="text-2xl font-bold text-red-600">{stats.newTodayCount}</p>
      </div>
    </div>
  );
};

export default Sidebar;
