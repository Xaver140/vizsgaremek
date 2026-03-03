import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Adminkezelo from "./pages/Admin";
import Userkezelo from "./pages/User";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Adminkezelo />} />
        <Route path="/user" element={<Userkezelo />} />
      </Routes>
    </BrowserRouter>
  );
}