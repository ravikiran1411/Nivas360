import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProperty = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const { backendUrl, token } = useContext(DataContext);

  const [data, setData] = useState({
    price: "",
    availability: ""
  });

  const fetchProperty = async () => {

    const res = await axios.get(
      backendUrl + "/api/owner/properties",
      { headers: { token } }
    );

    const property = res.data.properties.find(p => p._id === id);

    if (property) {
      setData({
        price: property.price,
        availability: property.availability
      });
    }

  };

  useEffect(() => {
    fetchProperty();
  }, []);

  const updateHandler = async (e) => {

    e.preventDefault();

    const res = await axios.post(
      backendUrl + "/api/owner/update-property",
      {
        propertyId: id,
        price: data.price,
        availability: data.availability
      },
      { headers: { token } }
    );

    if (res.data.success) {
      toast.success("Property Updated");

      navigate("/owner/properties");
    }

  };

  const deleteHandler = async () => {

    const res = await axios.post(
      backendUrl + "/api/owner/remove-property",
      { propertyId: id },
      { headers: { token } }
    );

    if (res.data.success) {

      toast.success("Property Removed");

      navigate("/owner/properties");

    }

  };

  return (
    <form onSubmit={updateHandler} className="flex flex-col gap-4 max-w-xl">

      <input
        type="number"
        value={data.price}
        onChange={(e)=>setData({...data,price:e.target.value})}
        placeholder="Price"
      />

      <select
        value={data.availability}
        onChange={(e)=>setData({...data,availability:e.target.value})}
      >
        <option value="Immediately">Immediately</option>
        <option value="After 3 months">After 3 months</option>
      </select>

      <button className="bg-black text-white py-2">
        Update Property
      </button>

      <button
        type="button"
        onClick={deleteHandler}
        className="bg-red-600 text-white py-2"
      >
        Remove Property
      </button>

    </form>
  );
};

export default EditProperty;