import { Link } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function Navbar(){

  const role = getUserRole();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return(
    <nav>

      <div className="nav-container">

        <div className="nav-left">
          <Link to="/">Főoldal</Link>
          <Link to="/filmek">Filmek</Link>

          {role === "admin" && (
            <Link to="/admin">Admin</Link>
          )}
        </div>

        <div className="nav-right">

          {!role && (
            <>
              <Link to="/login">
                <button>Bejelentkezés</button>
              </Link>

              <Link to="/register">
                <button>Regisztráció</button>
              </Link>
            </>
          )}
          {role && (
            <button onClick={logout}>
              Kijelentkezés
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}