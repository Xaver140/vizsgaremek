import { useState } from "react";
import api from "../api/api";
import { getUserRole } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ show, onClose }) {

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();

  if (!show) return null;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      onClose();

      const role = getUserRole();
      if (role === "admin") navigate("/admin");
      else navigate("/filmek");

    } catch (err) {
      alert(err.response?.data?.error || "Hiba történt");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        email,
        password,
        full_name: fullName
      });

      alert("Sikeres regisztráció!");
      setIsLogin(true);

    } catch {
      alert("Hiba történt a regisztráció során.");
    }
  };

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">

          <div className="d-flex justify-content-between align-items-center">
            <h4>{isLogin ? "Bejelentkezés" : "Regisztráció"}</h4>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <hr />

          <form onSubmit={isLogin ? handleLogin : handleRegister}>

            {!isLogin && (
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Teljes név"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn btn-success w-100">
              {isLogin ? "Belépés" : "Regisztráció"}
            </button>

          </form>

          <p className="text-center mt-3">
            {isLogin ? "Nincs még fiókod?" : "Van már fiókod?"}
            <span
              style={{ color: "#ff7a00", cursor: "pointer", marginLeft: "5px" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Regisztráció" : "Bejelentkezés"}
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}