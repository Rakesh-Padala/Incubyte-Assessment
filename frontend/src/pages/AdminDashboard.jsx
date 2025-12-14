import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminNavbar from "../components/AdminNavbar";
import AddSweet from "./AddSweet";
import SweetList from "./SweetList";
import SweetSearch from "../components/SweetSearch";

const AdminDashboard = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      <AdminNavbar />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<SweetList />} />
          <Route path="/add" element={<AddSweet />} />
          <Route path="/search" element={<SweetSearch />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
