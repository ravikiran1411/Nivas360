import { useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { toast } from "react-toastify";

const AddProperty = () => {

  const { backendUrl, token } = useContext(DataContext);

  const [images, setImages] = useState([]);

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
    availability: "Immediately"
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {

      const res = await axios.post(
        backendUrl + "/api/owner/add-property",
        formData,
        { headers: { token } }
      );

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
          availability: "Immediately"
        });

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
        onSubmit={submitHandler}
        className="w-full max-w-4xl bg-white p-8 rounded shadow flex flex-col gap-6"
      >

        {/* IMAGE UPLOAD */}

        <div>

          <p className="font-medium mb-2">Upload Images</p>

          <div className="flex gap-3 flex-wrap">

            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}

            <label className="w-24 h-24 border flex items-center justify-center cursor-pointer bg-gray-100 rounded hover:bg-gray-200">

              +

              <input
                type="file"
                multiple
                hidden
                onChange={handleImageChange}
              />

            </label>

          </div>

        </div>


        {/* TITLE */}

        <div>

          <p className="font-medium mb-1">Property Title</p>

          <input
            value={data.title}
            onChange={(e)=>setData({...data,title:e.target.value})}
            className="border px-3 py-2 rounded w-full"
            placeholder="Enter property title"
            required
          />

        </div>


        {/* DESCRIPTION */}

        <div>

          <p className="font-medium mb-1">Description</p>

          <textarea
            value={data.description}
            onChange={(e)=>setData({...data,description:e.target.value})}
            rows={4}
            className="border px-3 py-2 rounded w-full"
            placeholder="Write property description"
          />

        </div>


        {/* PURPOSE + TYPE + BHK */}

        <div className="flex flex-wrap gap-6">

          <div>

            <p className="mb-1 font-medium">Purpose</p>

            <select
              className="border px-3 py-2 rounded"
              onChange={(e)=>setData({...data,purpose:e.target.value})}
            >
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
            </select>

          </div>


          <div>

            <p className="mb-1 font-medium">Property Type</p>

            <select
              className="border px-3 py-2 rounded"
              onChange={(e)=>setData({...data,propertyType:e.target.value})}
            >
              <option value="flat">Flat</option>
              <option value="villa">Villa</option>
              <option value="individual-house">House</option>
              <option value="plot">Plot</option>
            </select>

          </div>


          <div>

            <p className="mb-1 font-medium">BHK</p>

            <input
              type="number"
              value={data.bhk}
              onChange={(e)=>setData({...data,bhk:e.target.value})}
              className="border px-3 py-2 rounded w-24"
            />

          </div>

        </div>


        {/* PRICE + AREA */}

        <div className="flex flex-wrap gap-6">

          <div>

            <p className="mb-1 font-medium">Price</p>

            <input
              type="number"
              value={data.price}
              onChange={(e)=>setData({...data,price:e.target.value})}
              className="border px-3 py-2 rounded"
            />

          </div>

          <div>

            <p className="mb-1 font-medium">Sq Yards</p>

            <input
              type="number"
              value={data.SqYards}
              onChange={(e)=>setData({...data,SqYards:e.target.value})}
              className="border px-3 py-2 rounded"
            />

          </div>

        </div>


        {/* LOCATION */}

        <div className="flex flex-wrap gap-6">

          <input
            placeholder="City"
            value={data.city}
            onChange={(e)=>setData({...data,city:e.target.value})}
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Area"
            value={data.area}
            onChange={(e)=>setData({...data,area:e.target.value})}
            className="border px-3 py-2 rounded"
          />

          <input
            type="number"
            placeholder="Pincode"
            value={data.pincode}
            onChange={(e)=>setData({...data,pincode:e.target.value})}
            className="border px-3 py-2 rounded"
          />

        </div>


        {/* AVAILABILITY */}

        <div>

          <p className="mb-1 font-medium">Availability</p>

          <select
            className="border px-3 py-2 rounded"
            onChange={(e)=>setData({...data,availability:e.target.value})}
          >
            <option value="Immediately">Immediately</option>
            <option value="After 3 months">After 3 months</option>
          </select>

        </div>


        {/* SUBMIT */}

        <button
          className="bg-black text-white py-3 px-6 rounded w-40 hover:bg-gray-900"
          type="submit"
        >
          Add Property
        </button>

      </form>

    </div>
  );
};

export default AddProperty;