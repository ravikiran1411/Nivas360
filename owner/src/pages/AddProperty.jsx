import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { toast } from "react-toastify";

const AddProperty = () => {
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

  const [images, setImages] = useState([]);

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
        { headers: { token: localStorage.getItem("token") } }
      );

      if (res.data.success) {
        toast.success("Property Added Successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-3 max-w-xl">

      <input placeholder="Title"
        onChange={(e)=>setData({...data,title:e.target.value})} />

      <textarea placeholder="Description"
        onChange={(e)=>setData({...data,description:e.target.value})} />

      <select onChange={(e)=>setData({...data,purpose:e.target.value})}>
        <option value="sell">Sell</option>
        <option value="rent">Rent</option>
      </select>

      <select onChange={(e)=>setData({...data,propertyType:e.target.value})}>
        <option value="flat">Flat</option>
        <option value="individual-house">Individual House</option>
        <option value="villa">Villa</option>
        <option value="plot">Plot</option>
      </select>

      <input type="number" placeholder="BHK"
        onChange={(e)=>setData({...data,bhk:e.target.value})} />

      <input type="number" placeholder="Price"
        onChange={(e)=>setData({...data,price:e.target.value})} />

      <input type="number" placeholder="SqYards"
        onChange={(e)=>setData({...data,SqYards:e.target.value})} />

      <input placeholder="City"
        onChange={(e)=>setData({...data,city:e.target.value})} />

      <input placeholder="Area"
        onChange={(e)=>setData({...data,area:e.target.value})} />

      <input type="number" placeholder="Pincode"
        onChange={(e)=>setData({...data,pincode:e.target.value})} />

      <select onChange={(e)=>setData({...data,availability:e.target.value})}>
        <option value="Immediately">Immediately</option>
        <option value="After 3 months">After 3 months</option>
      </select>

      <input type="file" multiple
        onChange={(e)=>setImages([...e.target.files])} />

      <button className="bg-black text-white py-2">ADD</button>

    </form>
  );
};

export default AddProperty;