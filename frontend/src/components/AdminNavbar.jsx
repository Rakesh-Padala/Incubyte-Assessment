import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminNavbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">🍬 Sweet Admin</h1>

      <div className="flex gap-6 items-center">
        <NavLink to="/admin" className="hover:text-yellow-300">
          View Sweets
        </NavLink>
        <NavLink to="/admin/add" className="hover:text-yellow-300">
          Add Sweet
        </NavLink>
        <NavLink to="/admin/search" className="hover:text-yellow-300">
          Search
        </NavLink>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-full"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
