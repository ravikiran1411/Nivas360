import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../context/DataContext";

const OwnerRoute = ({ children }) => {

  const { backendUrl, token } = useContext(DataContext);

  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {

    const checkOwner = async () => {

      if (!token) {
        setLoading(false);
        return;
      }

      try {

        const res = await axios.get(
          backendUrl + "/api/owner/status",
          { headers: { token } }
        );

        if (res.data.status === "approved") {
          setIsOwner(true);
        }

      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    checkOwner();

  }, [token]);

  if (loading) return null;

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!isOwner) {
    return <Navigate to="/profile" />;
  }

  return children;
};

export default OwnerRoute;