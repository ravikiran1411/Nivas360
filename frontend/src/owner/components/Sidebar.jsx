import { NavLink } from "react-router-dom"

import add_icon from "../../assets/add_icon.png"
import chat_icon from "../../assets/chat_icon.png"
import list_icon from "../../assets/list_icon.png"

const Sidebar = () => {

  return (

    <div className="w-[220px] min-h-screen bg-white border-r">

      <div className="flex flex-col gap-2 p-4">

        <NavLink
          to="/owner/properties"
          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
        >
          <img src={list_icon} className="w-5" />
          <p>Properties</p>
        </NavLink>

        <NavLink
          to="/owner/add-property"
          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
        >
          <img src={add_icon} className="w-5" />
          <p>Add Property</p>
        </NavLink>

        <NavLink
          to="/owner/chat"
          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
        >
          <img src={chat_icon} className="w-5" />
          <p>Chat</p>
        </NavLink>

      </div>

    </div>
  )
}

export default Sidebar