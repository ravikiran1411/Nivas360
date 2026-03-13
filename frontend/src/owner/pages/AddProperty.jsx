import { useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { toast } from "react-toastify";

const AddProperty = () => {
  const { backendUrl, token } = useContext(DataContext);
  const [images, setImages] = useState([]);
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const availability = availabilityType === "Immediately" ? "Immediately" : `After ${availabilityMonths} months`;

    Object.keys(data).forEach((key) => {
      if (key === "parking") {
        formData.append("parking", JSON.stringify(data.parking));
      } 
      else {
        formData.append(key, data[key]);
      }
    });

    formData.append("availability", availability);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await axios.post(backendUrl + "/api/owner/add-property",formData,{headers:{token}});

      if (res.data.success) {
        toast.success("Property Added Successfully");
        setImages([]);
        setData({
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
      } 
      else {
        toast.error(res.data.message);
      }
    } 
    catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={submitHandler} className="w-full max-w-4xl bg-white p-8 rounded shadow flex flex-col gap-6" >
        <div>
          <p className="font-medium mb-2">Upload Images</p>

          <div className="flex gap-3 flex-wrap">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img src={URL.createObjectURL(img)} className="w-24 h-24 object-cover rounded border" />

                <button type="button" onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1" >X
                </button>
              </div>
            ))}

            {images.length < 6 && (
              <label className="w-24 h-24 border flex items-center justify-center cursor-pointer bg-gray-100 rounded">+
                <input type="file" hidden multiple onChange={handleImageChange} />
              </label>
            )}
          </div>
        </div>

        <input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })}
          className="border px-3 py-2 rounded" placeholder="Property Title" />

        <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })}
          className="border px-3 py-2 rounded" placeholder="Description" />

        <div className="flex gap-6">
          <select value={data.purpose}
            onChange={(e) => setData({ ...data, purpose: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            <option value="sell">Sell</option>
            <option value="rent">Rent</option>
          </select>

          <select value={data.propertyType}
            onChange={(e) => setData({ ...data, propertyType: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            <option value="flat">Flat</option>
            <option value="villa">Villa</option>
            <option value="individual-house">House</option>
            <option value="plot">Plot</option>
          </select>

          <input type="number" value={data.bhk} onChange={(e) => setData({ ...data, bhk: e.target.value })}
            className="border px-3 py-2 rounded" placeholder="BHK" />
        </div>

        <div className="flex gap-6">
          <input type="number" value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })}
            className="border px-3 py-2 rounded" placeholder="Price" />

          <input type="number" value={data.SqYards} onChange={(e) => setData({ ...data, SqYards: e.target.value })}
            className="border px-3 py-2 rounded" placeholder="SqYards" />
        </div>

        <div className="flex gap-6">
          <input value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })}
            className="border px-3 py-2 rounded" placeholder="City" />

          <input value={data.area} onChange={(e) => setData({ ...data, area: e.target.value })}
            className="border px-3 py-2 rounded" placeholder="Area" />

          <input type="number" value={data.pincode} onChange={(e) => setData({ ...data, pincode: e.target.value })}
            className="border px-3 py-2 rounded" placeholder="Pincode" />
        </div>

        <div>
          <p className="font-medium mb-1">Parking</p>
          <label className="mr-4">
            <input type="checkbox" checked={data.parking.car}
              onChange={(e) =>
                setData({...data,parking: { ...data.parking, car: e.target.checked } }) }/>
                {" "} Car
          </label>

          <label>
            <input type="checkbox" checked={data.parking.bike}
              onChange={(e) =>
                setData({ ...data,parking: { ...data.parking, bike: e.target.checked}})} />
                {" "} Bike
          </label>
        </div>

        <div>
          <p className="mb-1 font-medium">Availability</p>

          <div className="flex gap-3 items-center">
            <select value={availabilityType} onChange={(e) => setAvailabilityType(e.target.value)}
              className="border px-3 py-2 rounded" >
              <option value="Immediately">Immediately</option>
              <option value="After">After</option>
            </select>

            {availabilityType === "After" && (
              <>
                <input type="number" value={availabilityMonths} onChange={(e) => setAvailabilityMonths(e.target.value)}
                  className="border px-3 py-2 rounded w-24" placeholder="Months" />

                <span>months</span>
              </>
            )}
          </div>
        </div>

        <button className="bg-black text-white py-3 px-6 rounded w-40">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
