import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import api from "../api/api";

export default function Adminkezelo() {
  const [search, setSearch] = useState("");
  const [films, setFilms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration_minutes: "",
    release_year: "",
    genre: "",
    is_active: 1
  });

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
  const res = await api.get("/admin/filmek");
  console.log(res.data);
  setFilms(res.data);
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await api.put(`/admin/filmek/${editingId}`, form);
    } else {
      await api.post("/admin/filmek", form);
    }

    setForm({
      title: "",
      description: "",
      duration_minutes: "",
      release_year: "",
      genre: "",
      is_active: 1
    });

    setEditingId(null);
    fetchFilms();
  };

  // ✅ JAVÍTOTT handleEdit
  const handleEdit = (film) => {
    setEditingId(film.film_id);
    setForm({
      title: film.title,
      description: film.description,
      duration_minutes: film.duration_minutes,
      release_year: film.release_year,
      genre: film.genre,
      is_active: film.is_active
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/admin/filmek/${id}`);
    fetchFilms();
  };

  // visszaaktiválás
  const handleReactivate = async (id) => {
    await api.put(`/admin/filmek/${id}`, {
      ...films.find(f => f.film_id === id),
      is_active: 1
    });
    fetchFilms();
  };

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} isAdmin={true} />
      <h1>Admin - Film kezelés</h1>

      <h3>{editingId ? "Film szerkesztése" : "Új film hozzáadása"}</h3>

      <input name="title" placeholder="Cím" value={form.title} onChange={handleChange} />
      <input name="description" placeholder="Leírás" value={form.description} onChange={handleChange} />
      <input name="duration_minutes" placeholder="Hossz (perc)" value={form.duration_minutes} onChange={handleChange} />
      <input name="release_year" placeholder="Év" value={form.release_year} onChange={handleChange} />
      <input name="genre" placeholder="Műfaj" value={form.genre} onChange={handleChange} />

      <button onClick={handleSubmit}>
        {editingId ? "Frissítés" : "Hozzáadás"}
      </button>

      <hr />
      <div>
      <h3>Filmek listája</h3>
      {/* Searchbar fimekhez */}
      <SearchBar search={search} setSearch={setSearch} />
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cím</th>
            <th>Leírás</th>
            <th>Hossz (perc)</th>
            <th>Év</th>
            <th>Műfaj</th>
            <th>Aktív</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {films
          .filter(film =>
          film.title.toLowerCase().includes(search.toLowerCase())
          )
          .map(film => (
          <tr key={film.film_id}>
            <td>{film.film_id}</td>
            <td>{film.title}</td>
            <td>{film.description}</td>
            <td>{film.duration_minutes}</td>
            <td>{film.release_year}</td>
            <td>{film.genre}</td>
            <td>{Number(film.is_active) === 1 ? "Aktív" : "Inaktív"}</td>
            <td>
              <button onClick={() => handleEdit(film)}>Szerkeszt</button>
              <button onClick={() => handleDelete(film.film_id)}>Deaktivál</button>
              {film.is_active === 0 && (
              <button onClick={() => handleReactivate(film.film_id)}>
                Aktiválás
              </button>
              )}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}