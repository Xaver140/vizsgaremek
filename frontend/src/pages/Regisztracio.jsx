import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      setMessage("Sikeres regisztráció!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setMessage("Hiba történt a regisztráció során.");
      console.error(err);
    }
  };

  return (
  <div>
    
    <Navbar/>
    <div className="container">

      <div className="content">
        <h1>Regisztráció</h1>

        <form onSubmit={handleSubmit}>

          <input type="text"name="full_name"placeholder="Teljes név"value={form.full_name}onChange={handleChange}required/>
          <br/>
          <input type="email"name="email"placeholder="Email"value={form.email}onChange={handleChange}required/>
          <br/>
          <input type="password"name="password"placeholder="Jelszó"value={form.password}onChange={handleChange}required/>
          <br/>
          <button type="submit">Regisztráció</button>
        </form>
      </div>
    </div>
  </div>
);
};