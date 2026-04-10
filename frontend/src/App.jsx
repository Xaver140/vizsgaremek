import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


// oldalak
import Fooldal from "./pages/Fooldal";
import Login from "./pages/Login";
import Adminkezelo from "./pages/Admin";
import Userkezelo from "./pages/Filmek";
import Register from "./pages/Regisztracio";
import Filmreszlet from "./pages/Filmreszlet";
import Szekfog from "./pages/Szekfog";
import Profil from "./pages/profil";
import Fizetes from "./pages/Fizetes";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Fooldal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Adminkezelo />} />
            <Route path="/filmek" element={<Userkezelo />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/register" element={<Register />} />
            <Route path="/film/:id" element={<Filmreszlet />} />
            <Route path="/foglalas/:vetitesId" element={<Szekfog />} />
            <Route path="/fizetes" element={<Fizetes />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}