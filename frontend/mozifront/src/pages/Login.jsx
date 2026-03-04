import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      const role = getUserRole();

      if (role === "admin") navigate("/admin");
      else navigate("/filmek");

    } catch (err) {
      alert("Hibás bejelentkezés");
    }
  };

  return (
    <div>
      <Navbar/>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h2>Bejelentkezés</h2>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Jelszó"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <p>
                Nincs még fiókod?
              <a href="/register"> Regisztráció</a>
            </p>
          </form>
        </div>
    </div>
  );
}