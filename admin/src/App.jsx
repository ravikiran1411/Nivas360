import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { istokenExpired } from "./utils/istokenExpired";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import PendingRequests from "./pages/PendingRequests";
import ApprovedRequests from "./pages/ApprovedRequests";
import OwnersList from "./pages/OwnersList";

export const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const App = () => {

  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || ""
  );

  useEffect(() => {
    if (adminToken && isTokenExpired(adminToken)) {
      localStorage.removeItem("adminToken");
      setAdminToken("");
    }
  }, []);

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem("adminToken", adminToken);
    } else {
      localStorage.removeItem("adminToken");
    }
  }, [adminToken]);

  const isValidAdmin = adminToken && !istokenExpired(adminToken);

  return (
  <div className="bg-gray-100 min-h-screen">
    <ToastContainer />

    {!isValidAdmin ? (
      <Login setAdminToken={setAdminToken} />
    ) : (
      <>
        <Navbar setAdminToken={setAdminToken} />

        <div className="flex mt-6 px-6">
          <Sidebar />

          <div className="w-[80%] px-8">
            <div className="bg-white shadow-xl rounded-xl p-8 min-h-[500px]">

              <Routes>
                <Route path="/" element={<PendingRequests adminToken={adminToken} />} />
                <Route path="/pending" element={<PendingRequests adminToken={adminToken} />} />
                <Route path="/approved" element={<ApprovedRequests adminToken={adminToken} />} />
                <Route path="/owners" element={<OwnersList adminToken={adminToken} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>

            </div>
          </div>

        </div>
      </>
    )}
  </div>
);
}

export default App;