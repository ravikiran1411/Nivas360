import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {

  const backendUrl = "http://localhost:4000";

  const [properties, setProperties] = useState([]);
  const [LOCATIONS, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [savedProperty, setSavedProperty] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const currency = "₹";

  const fetchProperties = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/properties/all");
      if (res.data.success) {
        setProperties(res.data.properties);
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/properties/cities");
      if (res.data.success) {
        setLocations(res.data.cities);
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  const fetchWishlist = async () => {

    if (!token) return;
    try {
      const res = await axios.get(backendUrl + "/api/wishlist",{headers:{token}});
      if (res.data.success) {
        const saved = {};
        res.data.wishlist.forEach((item) => { saved[item._id] = true});
        setSavedProperty(saved);
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  const saveProperty = async (propertyId) => {
    if (!token) return;
    try {
      if (savedProperty[propertyId]) {
        await axios.post(backendUrl + "/api/wishlist/remove",{propertyId},{headers:{token}});
      } 
      else {
        await axios.post(backendUrl + "/api/wishlist/add",{propertyId},{headers:{token}});
      }

      fetchWishlist();
    } 
    catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setSavedProperty({});
    window.location.href = "/";

  };

  useEffect(() => {
    fetchProperties();
    fetchCities();
  }, []);


  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [token]);

  const value = {backendUrl, properties, LOCATIONS, selectedLocation, setSelectedLocation, currency,
     saveProperty, savedProperty, token, setToken, logout };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;