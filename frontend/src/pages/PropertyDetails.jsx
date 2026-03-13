import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { assets } from "../assets/assets";
import axios from "axios";

const PropertyDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const { properties, currency, backendUrl, token, saveProperty, savedProperty } = useContext(DataContext);

  const [propertyData, setPropertyData] = useState(null);
  const [image, setImage] = useState(null);
  const [bedRoom, setBedRoom] = useState("");

  useEffect(() => {
    const property = properties.find((item) => item._id === id);
    if (!property) return;

    setPropertyData(property);
    setImage(property.images[0]);

    if (property.bhk === 1) setBedRoom("1 Bedroom");
    else if (property.bhk === 2) setBedRoom("2 Bedrooms");
    else if (property.bhk === 3) setBedRoom("3 Bedrooms");

  }, [id, properties]);

  const startChat = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {

      const res = await axios.post(backendUrl + "/api/chat/start",{ownerId:propertyData.ownerId._id},{headers:{token}});

      if (res.data.success) {
        navigate("/chat?chatId=" + res.data.chat._id);
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  if (!propertyData) return null;

  return (
    <div className="sm:px-8 mt-5 sm:mb-10 bg-slate-50 rounded-lg">

      <div className="sm:mx-8 rounded-lg px-2">
        <div className="py-3 sm:pt-5 flex flex-col gap-3 sm:mb-4">

          <div className="flex flex-col sm:flex-row justify-between sm:px-8">

            <div className="text-sm sm:text-2xl font-medium flex gap-2 items-center">

              <p className="flex gap-2">
                {propertyData.title}
              </p>

            </div>

            <div className="text-lg sm:text-3xl font-bold">
              {currency}{propertyData.price}
              {propertyData.purpose === "rent" && "/Month"}
            </div>

          </div>

          <div className="flex gap-2 items-center flex-1 text-sm font-medium sm:text-2xl sm:px-8">
            <img src={assets.location_icon} className="w-4 sm:w-7" />
            <p>
              {propertyData.location.city}, {propertyData.location.area}
            </p>
          </div>

        </div>

        <div className="w-full flex flex-col sm:flex-row sm:gap-4">
          <div className="sm:w-3/4 max-w-4xl pt-1 relative">
            <div className="w-full h-80 sm:h-155 overflow-hidden rounded relative">
              <img src={image} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded">
                {propertyData.images.length} Images
              </div>
            </div>
          </div>

          <div className="flex min-w-[33%] lg:min-w-0 flex-nowrap overflow-x-scroll md:overflow-hidden gap-5 sm:gap-3 py-5 sm:py-0 sm:grid grid-cols-2">

            {propertyData.images.map((img, index) => (

              <img key={index} src={img} onClick={() => setImage(img)}
                className="w-20 h-20 sm:w-50 sm:h-50 rounded cursor-pointer" />
            ))}

          </div>
        </div>

        <div className="mt-16 bg-white shadow-md rounded-3xl overflow-hidden">
          <div className="grid sm:grid-cols-2 gap-20 items-center mx-auto">
            <div className="p-10 flex flex-col gap-6 mx-auto">
              <p className="text-3xl font-semibold text-gray-800">
                Connect With Owner
              </p>

              <p className="text-gray-500">
                Chat directly with property owner.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button onClick={startChat}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition cursor-pointer">
                  Chat Now
                </button>

                <button onClick={() => saveProperty(propertyData._id)}
                  className={`px-6 py-3 rounded-xl text-white ${
                    savedProperty[propertyData._id]
                      ? "bg-green-600"
                      : "bg-orange-500"
                  }`}
                >
                  {savedProperty[propertyData._id]
                    ? "Saved"
                    : "Save Property"}
                </button>

              </div>

            </div>

            <div className="hidden mx-auto sm:flex">
              <img src={assets.house_img}
                className="w-1/2 h-1/2 object-cover rounded-2xl opacity-80" />
            </div>

          </div>

        </div>

        <div className="bg-white px-4 py-2 rounded sm:mt-10 shadow-md">

          <p className="text-lg sm:text-3xl font-semibold text-center">
            Property Highlights
          </p>

          <div className="flex gap-6 md:justify-between overflow-x-scroll sm:overflow-hidden flex-nowrap sm:flex-4 pt-5 sm:pt-10">

            {propertyData.propertyType !== "plot" && (

              <div className="flex flex-col items-center gap-5 min-w-[33%] sm:min-w-0">
                <img src={assets.bed_icon} className="w-7 h-7" />
                <p>{bedRoom}</p>
              </div>

            )}

            <div className="flex flex-col gap-5 items-center min-w-[33%] sm:min-w-0">
              <img src={assets.plots_icon} className="w-7 h-7" />
              <p>{propertyData.SqYards} SqYards</p>
            </div>

            <div className="flex flex-col items-center gap-5 min-w-[33%] sm:min-w-0">
              <img src={assets.parking} className="w-7 h-7" />
              <p>Bike Parking</p>
            </div>

            <div className="flex flex-col items-center gap-4 min-w-[33%] sm:min-w-0">
              <p className="border p-1 text-sm font-bold rounded-lg">
                STATUS
              </p>
              <p>{propertyData.availability}</p>
            </div>
          </div>

        </div>

        <div className="mt-5 sm:mt-10 bg-white shadow-lg pl-2 py-2 sm:px-5">

          <p className="text-lg sm:text-3xl font-semibold">
            Property Details
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 pt-5 sm:ml-10">

            <div>
              <p className="text-blue-600">City</p>
              <p className="text-xl">{propertyData.location.city}</p>
            </div>

            <div>
              <p className="text-blue-600">Area</p>
              <p className="text-xl">{propertyData.location.area}</p>
            </div>

            <div>
              <p className="text-blue-600">SqYards</p>
              <p className="text-xl">{propertyData.SqYards}</p>
            </div>

            <div>
              <p className="text-blue-600">Property Type</p>
              <p className="text-xl">{propertyData.propertyType}</p>
            </div>

            <div>
              <p className="text-blue-600">Purpose</p>
              <p className="text-xl">{propertyData.purpose}</p>
            </div>

            {propertyData.propertyType !== "plot" && (
              <div>
                <p className="text-blue-600">BHK</p>
                <p className="text-xl">{propertyData.bhk}</p>
              </div>
            )}

          </div>

        </div>

        <div className="mt-5 sm:mt-10 bg-white shadow-md pl-2 py-2 sm:px-5">

          <p className="text-lg sm:text-3xl font-semibold">
            Description
          </p>

          <p className="text-sm font-medium py-3 text-gray-600">
            {propertyData.description}
          </p>

        </div>

        <div className="my-5 sm:my-10 bg-white rounded-lg shadow-md pl-2 py-2 sm:px-5">

          <p className="text-lg sm:text-3xl font-semibold">
            Nearby Places
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3">

            <div className="flex flex-col items-center gap-4 pt-5">
              <img src={assets.airport} className="w-8" />
              <p>20km to Airport</p>
            </div>

            <div className="flex flex-col items-center gap-4 pt-5">
              <img src={assets.bus_station} className="w-8" />
              <p>1.5km to Bus Station</p>
            </div>

            <div className="flex flex-col items-center gap-4 pt-5">
              <img src={assets.railwayStation} className="w-8" />
              <p>1.5km to Railway Station</p>
            </div>

            <div className="flex flex-col items-center gap-4 pt-5">
              <img src={assets.hospital} className="w-8" />
              <p>500m to Hospital</p>
            </div>

            <div className="flex flex-col items-center gap-4 pt-5">
              <img src={assets.shopping} className="w-8" />
              <p>600m to Shopping Mall</p>
            </div>

            <div className="flex flex-col items-center gap-4 pt-5">
              <img src={assets.petrol_bunk} className="w-8" />
              <p>1km to Gas Station</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PropertyDetails;