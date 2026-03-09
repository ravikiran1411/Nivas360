import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { assets } from '../assets/assets';
import { DataContext } from "../context/DataContext";

export default function LocationSelector() {

  const { backendUrl, selectedLocation, setSelectedLocation } = useContext(DataContext);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!backendUrl) return;
    const fetchCities = async () => {
      try {
        const res = await axios.get(backendUrl + "/api/properties/cities");
        if (res.data.success) {
          setCities(res.data.cities);
        }
      } 
      catch (error) {
        console.log(error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchCities();

  }, [backendUrl]);

  const filteredLocations = cities.filter((city) => city.toLowerCase().includes(search.toLowerCase()) );

  return (
    <>
      <div onClick={() => setOpen(true)}
        className="flex sm:bg-slate-200 items-center gap-2 sm:gap-4 sm:border sm:border-2 sm:border-slate-300 p-2 rounded-2xl cursor-pointer"
      >
        <p className="hidden sm:block text-gray-600 w-25 sm:w-45 text-sm font-medium sm:pl-3"> {selectedLocation || "Select your location"}</p>

        <div className="flex flex-col gap-1 items-center justify-center">
          <img src={assets.map_icon} className="w-5 h-5 sm:w-7 sm:h-7" />
          <p className="text-[10px] text-white block sm:hidden">location</p>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-24">
          <div className="bg-white w-full max-w-md rounded-2xl p-4 shadow-lg">
            <input type="text" placeholder="Search city" value={search} onChange={(e) => setSearch(e.target.value)} autoFocus
              className="w-full border p-3 rounded-xl outline-none mb-4" />
            <ul className="max-h-60 overflow-y-auto">
              {loading && (
                <p className="text-sm text-gray-400 px-4">Loading cities...</p>
              )}

              {!loading && filteredLocations.length > 0 && (
                filteredLocations.map((city) => (
                  <li className="px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-100" key={city} onClick={() => {
                      setSelectedLocation(city);
                      setOpen(false);
                      setSearch("");
                    }} >
                    <span className="flex items-center gap-2">
                      <img src={assets.map_icon} className="w-4 h-4" /> {city}
                    </span>
                  </li>
                ))
              )}

              {!loading && filteredLocations.length === 0 && (
                <p className="text-sm text-gray-400 px-4">No locations found</p>
              )}
            </ul>
            <button onClick={() => setOpen(false)} className="mt-4 text-sm text-gray-500 cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}