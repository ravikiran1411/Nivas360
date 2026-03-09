import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddProperty from "./pages/AddProperty";
import ListProperties from "./pages/ListProperties";
import EditProperty from "./pages/EditProperty";
import Chat from "./pages/Chat";

const App = () => {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="p-6 w-full">
          <Routes>
            <Route path="/add" element={<AddProperty />} />
            <Route path="/list" element={<ListProperties />} />
            <Route path="/edit/:id" element={<EditProperty />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="*" element={<Navigate to="/add" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;