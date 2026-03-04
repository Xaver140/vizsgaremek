import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fooldal from "./pages/Fooldal";
import Login from "./pages/Login";
import Adminkezelo from "./pages/Admin";
import Userkezelo from "./pages/Filmek";
import Register from "./pages/Regisztracio";
import "./App.css";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Fooldal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Adminkezelo />} />
        <Route path="/filmek" element={<Userkezelo />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}