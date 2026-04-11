import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Navbar() {

  const role = getUserRole();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

        <div className="container">

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* közép */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >

            <ul className="navbar-nav align-items-center gap-4">

              <li className="nav-item d-flex align-items-center">
                <img src="/images/mozilogo.webp" alt="logo" style={{ width: "40px", marginRight: "10px" }}/><Link className="nav-link fw-bold" to="/">SilverMozi</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/">Főoldal</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/filmek">Filmek</Link>
              </li>

              {role && (
                <li className="nav-item">
                  <Link className="nav-link" to="/profil">Profil</Link>
                </li>
              )}

              {role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/admin">Admin</Link>
                </li>
              )}

              {!role && (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light"
                      onClick={() => setShowAuth(true)}
                    >
                      Belépés
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-warning"
                      onClick={() => setShowAuth(true)}
                    >
                      Regisztráció
                    </button>
                  </li>
                </>
              )}

              {role && (
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={logout}>
                    Kijelentkezés
                  </button>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>
      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}