import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-60 bg-white min-h-screen p-6 border-r">
      <div className="flex flex-col gap-6">

        <NavLink to="/add">Add Property</NavLink>

        <NavLink to="/list">My Properties</NavLink>

        <NavLink to="/chats">Chats</NavLink>

      </div>
    </div>
  );
};

export default Sidebar;