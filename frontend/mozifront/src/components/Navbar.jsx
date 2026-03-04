import { Link } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function Navbar() {

  const role = getUserRole();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      borderBottom: "1px solid gray"
    }}>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/">Főoldal</Link>
        <Link to="/filmek">Filmek</Link>

        {role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {role && <Link to="/profil">Profil</Link>}
      </div>

      <div>
        {role ? (
          <button onClick={logout}>Kijelentkezés</button>
        ) : (
          <Link to="/login"><button>Bejelentkezés</button></Link>
        )}
        <Link to="/register"><button>Regisztráció</button></Link>
      </div>

    </nav>
  );
}