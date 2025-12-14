import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Sweets from "./pages/Sweets";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sweets" element={<Sweets />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
