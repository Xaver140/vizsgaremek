import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fooldal from "./pages/Fooldal";
import Login from "./pages/Login";
import Adminkezelo from "./pages/Admin";
import Userkezelo from "./pages/Filmek";
import Register from "./pages/Regisztracio";
import Filmreszlet from "./pages/Filmreszlet";
import Szekfog from "./pages/Szekfog";
import Profil from "./pages/profil";
import "./App.css";
import Fizetes from "./pages/Fizetes";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Fooldal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Adminkezelo />} />
        <Route path="/filmek" element={<Userkezelo />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/register" element={<Register />} />
        <Route path="/film/:id" element={<Filmreszlet />} />
        <Route path="/foglalas/:vetitesId" element={<Szekfog />} />
        <Route path="/fizetes" element={<Fizetes/>} />
      </Routes>
    </BrowserRouter>
  );
}