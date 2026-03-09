const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:5173/login";
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white shadow">
      <h2 className="text-xl font-bold">Owner Dashboard</h2>
      <button
        onClick={logout}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;