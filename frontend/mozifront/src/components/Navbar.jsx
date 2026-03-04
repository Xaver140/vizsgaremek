import SearchBar from "./SearchBar";
export default function Navbar({ search, setSearch }) {
  return (
    <nav>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >Kijelentkezés
      </button>
    </nav>
  );
}