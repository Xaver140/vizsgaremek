import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import { useState } from "react";
import AuthModal from "./AuthModal";
import "../App.css";

export default function Navbar() {

  const role = getUserRole();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark shadow-sm"
        style={{
          background: "linear-gradient(90deg, #111, #1a1a1a)",
          padding: "10px 0"
        }}
      >
        <div className="container d-flex justify-content-between align-items-center position-relative">

          {/*hambi */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link
            to="/"
            className="logo-center d-flex align-items-center text-decoration-none text-light">
            <img
              src="/images/mozilogo.webp"
              alt="logo"
              style={{
                width: "40px",
                marginRight: "10px",
                borderRadius: "50%"
              }}
            />
            <span className="fw-bold">SilverMozi</span>
          </Link>

          <div className={`navbar-collapse ${menuOpen ? "show" : "collapse"} justify-content-center`}>

            <ul className="navbar-nav align-items-center gap-4">

              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/" onClick={handleNavClick}>
                  Főoldal
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/filmek" onClick={handleNavClick}>
                  Filmek
                </Link>
              </li>

              {role && (
                <li className="nav-item">
                  <Link className="nav-link nav-hover" to="/profil" onClick={handleNavClick}>
                    Profil
                  </Link>
                </li>
              )}

              {role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link nav-hover text-warning" to="/admin" onClick={handleNavClick}>
                    Admin
                  </Link>
                </li>
              )}

              {!role && (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light btn-sm px-3 rounded-pill"
                      onClick={() => {
                        setShowAuth(true);
                        setMenuOpen(false);
                      }}
                    >
                      Belépés
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-warning btn-sm px-3 rounded-pill"
                      onClick={() => {
                        setShowAuth(true);
                        setMenuOpen(false);
                      }}
                    >
                      Regisztráció
                    </button>
                  </li>
                </>
              )}

              {role && (
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm px-3 rounded-pill"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
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