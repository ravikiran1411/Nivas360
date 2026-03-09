import {assets} from "../assets/assets";

const Navbar = ({setAdminToken})=>{
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md flex items-center justify-between px-10 py-4">

      <div className="flex items-center gap-4">
        <img src={assets.nivas_logo} alt="logo" className="w-28 bg-white p-2 rounded" />
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
      </div>

      <button className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-md hover:bg-gray-100 transition"
        onClick={() => setAdminToken("")} >
        Logout
      </button>

    </div>
  );
};

export default Navbar;
