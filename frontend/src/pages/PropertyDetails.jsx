import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { assets } from "../assets/assets";

const PropertyDetails = () => {

  const { id } = useParams();
  const { properties, currency } = useContext(DataContext);

  const [propertyData, setPropertyData] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const property = properties.find((item) => item._id === id);
    if (!property) return;

    setPropertyData(property);
    setImage(property.images[0]);

  }, [id, properties]);

  if (!propertyData) return null;

  return (
    <div className="bg-slate-50 min-h-screen pb-10">

      <div className="px-4 sm:px-8 pt-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-xl sm:text-3xl font-semibold">
            {propertyData.title}
          </h1>

          <p className="text-2xl font-bold text-green-600">
            {currency}{propertyData.price}
            {propertyData.purpose === "rent" && "/Month"}
          </p>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mt-2">
          <img src={assets.location_icon} className="w-4 sm:w-6" />
          <p>
            {propertyData.location.city}, {propertyData.location.area}
          </p>
        </div>

      </div>

      <div className="px-4 sm:px-8 mt-6 flex flex-col sm:flex-row gap-4">
        <div className="sm:w-3/4">
          <img src={image} className="w-full h-[250px] sm:h-[450px] object-cover rounded-lg" alt="" />
        </div>

        <div className="sm:w-1/4 grid grid-cols-4 sm:grid-cols-2 gap-2">
          {propertyData.images.map((img, index) => (
            <img key={index} src={img} onClick={() => setImage(img)}
              className="h-20 sm:h-28 w-full object-cover rounded cursor-pointer hover:opacity-80" />
          ))}
        </div>

      </div>

      <div className="px-4 sm:px-8 mt-8">
        <div className="bg-white p-5 sm:p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">
            Description
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {propertyData.description}
          </p>
        </div>

      </div>

      <div className="px-4 sm:px-8 mt-8">
        <div className="bg-white p-5 sm:p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Property Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Property Type:</span>{" "}
              {propertyData.propertyType}
            </p>
            <p>
              <span className="font-semibold">Purpose:</span>{" "}
              {propertyData.purpose}
            </p>
            {propertyData.propertyType !== "plot" && (
              <p>
                <span className="font-semibold">BHK:</span>{" "}
                {propertyData.bhk}
              </p>
            )}
            <p>
              <span className="font-semibold">Area:</span>{" "}
              {propertyData.SqYards} SqYards
            </p>
            <p>
              <span className="font-semibold">Availability:</span>{" "}
              {propertyData.availability}
            </p>
            <p>
              <span className="font-semibold">City:</span>{" "}
              {propertyData.location.city}
            </p>
            <p>
              <span className="font-semibold">Area:</span>{" "}
              {propertyData.location.area}
            </p>
            <p>
              <span className="font-semibold">Pincode:</span>{" "}
              {propertyData.location.pincode}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PropertyDetails;