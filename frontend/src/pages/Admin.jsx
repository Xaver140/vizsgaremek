import { useEffect, useState } from "react";
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

  const handleReactivate = async (id) => {
    await api.put(`/admin/filmek/${id}`, {
      ...films.find(f => f.film_id === id),
      is_active: 1
    });
    fetchFilms();
  };

  return (
    <div className="container py-4">
      {/* NEM TELJES!! HIBÁS LESZ A FELTÖLTÉS */ }
      <h2 className="mb-4">Admin - Film kezelés</h2>

      <div className="card p-3 mb-4">
        <h5>{editingId ? "Film szerkesztése" : "Új film hozzáadása"}</h5>

        <div className="row g-2">

          <div className="col-md-4">
            <input className="form-control" name="title" placeholder="Cím" value={form.title} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="genre" placeholder="Műfaj" value={form.genre} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <input className="form-control" name="duration_minutes" placeholder="Perc" value={form.duration_minutes} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <input className="form-control" name="release_year" placeholder="Év" value={form.release_year} onChange={handleChange} />
          </div>
          <div className="col-12">
            <input className="form-control" name="description" placeholder="Leírás" value={form.description} onChange={handleChange} />
          </div>

        </div>
        <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          {editingId ? "Frissítés" : "Hozzáadás"}
        </button>
      </div>

      {/* Film kereső!!!*/}
      <div className="mb-3">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="table-responsive">

        <table className="table table-dark table-striped table-hover align-middle">

          <thead>
            <tr>
              <th>ID</th>
              <th>Cím</th>
              <th>Műfaj</th>
              <th>Perc</th>
              <th>Év</th>
              <th>Státusz</th>
              <th>Művelet</th>
            </tr>
          </thead>

          <tbody>
            {films
              .filter(f => f.title.toLowerCase().includes(search.toLowerCase()))
              .map(film => (
                <tr key={film.film_id}>

                  <td>{film.film_id}</td>
                  <td>{film.title}</td>
                  <td>{film.genre}</td>
                  <td>{film.duration_minutes}</td>
                  <td>{film.release_year}</td>

                  <td>
                    <span className={`badge ${film.is_active ? "bg-success" : "bg-secondary"}`}>
                      {film.is_active ? "Aktív" : "Inaktív"}
                    </span>
                  </td>

                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(film)}>Szerkeszt</button>

                    <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(film.film_id)}>🗑️</button>

                    {film.is_active === 0 && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleReactivate(film.film_id)}
                      >
                        ✔
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}