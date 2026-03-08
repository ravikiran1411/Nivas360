import { useContext, useState } from "react";
import {assets} from '../assets/assets';
import { DataContext } from "../context/DataContext";


export default function LocationSelector() {
  const {LOCATIONS,selectedLocation,setSelectedLocation} =useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredLocations = LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
<<<<<<< HEAD
      <div onClick={() => setOpen(true)} className="flex sm:bg-slate-200 items-center gap-2 sm:gap-4 border sm:border-2 sm:border-slate-300 p-2 rounded-2xl cursor-pointer" >
        <p className="text-gray-600 w-25 sm:w-45 text-sm font-medium sm:pl-3 hidden sm:block ">{selectedLocation || "Select your location " } </p>
        <img src={assets.map_icon} alt="map" className="w-3 h-3 sm:w-7 sm:h-7" />
=======
      <div onClick={() => setOpen(true)} className="flex sm:bg-slate-200 items-center gap-2 sm:gap-4 sm:border sm:border-2 sm:border-slate-300 p-2 rounded-2xl cursor-pointer" >
        <p className="hidden sm:block text-gray-600 w-25 sm:w-45 text-sm font-medium sm:pl-3">{selectedLocation || "Select your location"} </p>
        <div className="flex flex-col gap-1 items-center justify-center"> 
          <img src={assets.map_icon} alt="map" className="w-5 h-5 sm:w-7 sm:h-7 " />
          <p className= "text-[10px] text-white text-center block sm:hidden ">location</p>
        </div>
>>>>>>> abd59d02cefdc5a4dd29f4b18cbdfaa271ca7b5d
      </div>

      { open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-24">
          
          <div className="bg-white w-50% sm:w-full max-w-md rounded-2xl p-4 shadow-lg">
            
            <input type="text" placeholder="Search city or area" value={search} onChange={(e) => setSearch(e.target.value)} 
            autoFocus className="w-full border p-3 rounded-xl outline-none mb-4" />

            <ul className="max-h-60 overflow-y-auto"> 
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc) => (
                  <li key={loc} 
                    onClick={() => { setSelectedLocation(loc);
                    setOpen(false);
                    setSearch("");
                    }}
                    className="px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-100 ">
                   <span className="flex flex-1 items-center gap-2 "> <img src={assets.map_icon} className="w-4 h-4" /> {loc}</span> </li>
                ))
              ) : (
                <p className="text-sm text-gray-400 px-4 ">No locations found</p>
              )}
            </ul>
            <button onClick={() => setOpen(false)} className="mt-4 text-sm text-gray-500 cursor-pointer ">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}