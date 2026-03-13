import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(DataContext);

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [availabilityType, setAvailabilityType] = useState("Immediately");
  const [availabilityMonths, setAvailabilityMonths] = useState("");

  const [data, setData] = useState({
    title: "",
    description: "",
    purpose: "sell",
    propertyType: "flat",
    bhk: "",
    price: "",
    SqYards: "",
    city: "",
    area: "",
    pincode: "",
    parking: { car: false, bike: false },
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    const res = await axios.get(backendUrl + "/api/owner/properties", {
      headers: { token },
    });
    const property = res.data.properties.find((p) => p._id === id);

    if (property) {
      setExistingImages(property.images);
      setData({
        title: property.title,
        description: property.description,
        purpose: property.purpose,
        propertyType: property.propertyType,
        bhk: property.bhk,
        price: property.price,
        SqYards: property.SqYards,
        city: property.location.city,
        area: property.location.area,
        pincode: property.location.pincode,
        parking: property.parking || { car: false, bike: false },
      });

      if (property.availability === "Immediately") {
        setAvailabilityType("Immediately");
      } else {
        setAvailabilityType("After");
        const months = property.availability.match(/\d+/);
        if (months) setAvailabilityMonths(months[0]);
      }
    }
  };

  const addImages = (e) => {
    const files = Array.from(e.target.files);

    if (existingImages.length + newImages.length + files.length > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const availability =
        availabilityType === "Immediately"
          ? "Immediately"
          : `After ${availabilityMonths} months`;
      const formData = new FormData();
      formData.append("propertyId", id);

      Object.keys(data).forEach((key) => {
        if (key === "parking") {
          formData.append("parking", JSON.stringify(data.parking));
        } else {
          formData.append(key, data[key]);
        }
      });

      formData.append("availability", availability);
      formData.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((img) => {
        formData.append("images", img);
      });

      const res = await axios.post(
        backendUrl + "/api/owner/update-property",
        formData,
        { headers: { token } },
      );

      if (res.data.success) {
        toast.success("Property Updated Successfully");
        navigate("/owner/properties");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={updateHandler}
        className="w-full max-w-4xl bg-white p-8 rounded shadow flex flex-col gap-6"
      >
        <div>
          <p className="font-medium mb-2">Upload Images</p>
          <div className="flex gap-3 flex-wrap">
            {existingImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  className="w-24 h-24 object-cover rounded border"
                />

                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1"
                >
                  X
                </button>
              </div>
            ))}

            {newImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  className="w-24 h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1"
                >
                  {" "}
                  X
                </button>
              </div>
            ))}

            {existingImages.length + newImages.length < 6 && (
              <label className="w-24 h-24 border flex items-center justify-center cursor-pointer bg-gray-100 rounded">
                +
                <input type="file" hidden multiple onChange={addImages} />
              </label>
            )}
          </div>
        </div>
        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="border px-3 py-2 rounded"
          placeholder="Property Title"
        />

        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="border px-3 py-2 rounded"
          placeholder="Description"
        />

        <div className="flex flex-wrap gap-6">
          <select
            className="border px-3 py-2 rounded"
            value={data.purpose}
            onChange={(e) => setData({ ...data, purpose: e.target.value })}
          >
            <option value="sell">Sell</option>
            <option value="rent">Rent</option>
          </select>

          <select
            className="border px-3 py-2 rounded"
            value={data.propertyType}
            onChange={(e) => setData({ ...data, propertyType: e.target.value })}
          >
            <option value="flat">Flat</option>
            <option value="villa">Villa</option>
            <option value="individual-house">House</option>
            <option value="plot">Plot</option>
          </select>

          {data.propertyType !== "plot" && (
            <input
              type="number"
              value={data.bhk}
              onChange={(e) => setData({ ...data, bhk: e.target.value })}
              className="border px-3 py-2 rounded w-24"
              placeholder="BHK" />
          )}

        </div>

        <div className="flex flex-wrap gap-6">
          <input
            type="number"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
            className="border px-3 py-2 rounded"
            placeholder="Price"
          />

          <input
            type="number"
            value={data.SqYards}
            onChange={(e) => setData({ ...data, SqYards: e.target.value })}
            className="border px-3 py-2 rounded"
            placeholder="Sq Yards"
          />
        </div>

        <div className="flex flex-wrap gap-6">
          <input
            placeholder="City"
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Area"
            value={data.area}
            onChange={(e) => setData({ ...data, area: e.target.value })}
            className="border px-3 py-2 rounded"
          />

          <input
            type="number"
            placeholder="Pincode"
            value={data.pincode}
            onChange={(e) => setData({ ...data, pincode: e.target.value })}
            className="border px-3 py-2 rounded"
          />
        </div>

        {data.propertyType !== "plot" && (
          <div>
            <p className="font-medium mb-1">Parking</p>

            <label className="mr-4">
              <input
                type="checkbox"
                checked={data.parking.car}
                onChange={(e) =>
                  setData({
                    ...data,
                    parking: { ...data.parking, car: e.target.checked },
                  })
                }
              />{" "}
              Car
            </label>

            <label>
              <input
                type="checkbox"
                checked={data.parking.bike}
                onChange={(e) =>
                  setData({
                    ...data,
                    parking: { ...data.parking, bike: e.target.checked },
                  })
                }
              />{" "}
              Bike
            </label>
          </div>
        )}

        <div>
          <p className="mb-1 font-medium">Availability</p>

          <div className="flex gap-3 items-center">
            <select
              className="border px-3 py-2 rounded"
              value={availabilityType}
              onChange={(e) => setAvailabilityType(e.target.value)}
            >
              <option value="Immediately">Immediately</option>
              <option value="After">After</option>
            </select>

            {availabilityType === "After" && (
              <>
                <input
                  type="number"
                  value={availabilityMonths}
                  onChange={(e) => setAvailabilityMonths(e.target.value)}
                  className="border px-3 py-2 rounded w-24"
                />
                <span>months</span>
              </>
            )}
          </div>
        </div>

        <button className="bg-black text-white py-3 px-6 rounded w-40">
          Update Property
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
