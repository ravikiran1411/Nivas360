import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";

const PropertyStyle = ({
  _id,
  images,
  title,
  price,
  location,
  SqYards,
  bhk,
  purpose,
  propertyType,
  ownerId,
}) => {
  const { currency, saveProperty, savedProperty, backendUrl, token } =
    useContext(DataContext);
  const navigate = useNavigate();

  const startChat = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        backendUrl + "/api/chat/start",
        { ownerId },
        { headers: { token } },
      );

      if (res.data.success) {
        navigate("/chat?chatId=" + res.data.chat._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }
    if (savedProperty[_id]) {
      navigate("/wishlist");
      return;
    }
    saveProperty(_id);
  };

  return (
    <Link
      to={`/property/${_id}`}
      className="w-full bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4 cursor-pointer">
      <div className="w-full h-44 sm:w-70 sm:h-50 overflow-hidden rounded-md">
        <img
          src={images?.[0]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between flex-1 gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-lg font-semibold text-slate-800">{title}</p>

          <p className=" sm:hidden text-xl font-bold text-slate-900">
            {currency}
            {price}
            {purpose === "rent" && "/Month"}
          </p>

          <p className="text-sm text-slate-500">
            <img className="w-5" src={assets.map_icon} /> {location}
          </p>

          <div className="flex gap-6">
            <p className="text-md font-medium">
              <span className="text-gray-700">SqYards:</span> {SqYards}
            </p>

            {propertyType !== "plot" && (
              <p className="text-md font-medium">
                <span className="text-gray-700">BHK:</span> {bhk}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-10">
            <button
              onClick={handleSave}
              className={`w-fit ${savedProperty[_id] ? " bg-blue-500 text-white  hover:bg-blue-600" : "bg-orange-500 text-white  hover:bg-orange-600"} px-4 py-2 rounded text-sm transition cursor-pointer hidden sm:block shadow-md min-w-32.5`}>
              {savedProperty[_id] ? "Saved " : "Save Property"}
            </button>

            <button
              onClick={startChat}
              className="w-fit bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md text-sm transition cursor-pointer hidden sm:block shadow-md" >
              Chat with Owner
            </button>
          </div>
        </div>

        <div className="hidden sm:flex flex-col justify-between">
          <p className="text-xl font-bold text-slate-900">
            {currency}
            {price}
            {purpose === "rent" && "/Month"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyStyle;
