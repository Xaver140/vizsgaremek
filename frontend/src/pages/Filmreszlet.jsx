import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Filmreszlet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [film, setFilm] = useState(null);
  const [vetitesek, setVetitesek] = useState([]);

  useEffect(() => {
    // film adait lekéri az ID alapján
    api.get("/filmek")
      .then(res => {
        const selected = res.data.find(f => f.film_id == id);
        setFilm(selected);
      });

    // vetítések
    api.get(`/vetites/${id}`)
      .then(res => setVetitesek(res.data));

  }, [id]);

  if (!film) return <p>Betöltés...</p>;

  return (
    <div>
      <Navbar />

      <div className="container mt-4">

        <div style={{ display: "flex", gap: "30px" }}>
          <img
            src={`/images/${film.film_img}`}
            alt={film.title}
            style={{
              width: "300px",
              borderRadius: "10px"
            }}
          />
          <div>
            <h2>{film.title}</h2>

            <div style={{ marginTop: "20px" }}>
              <p><strong>Filmműfaj:</strong> {film.genre}</p>
              <p><strong>Szereplők:</strong> {film.actors}</p>
              <p><strong>Rendező:</strong> {film.director}</p>
              <p><strong>Gyártó:</strong> {film.producer}</p>
              <p><strong>Korhatár:</strong> {film.age_limit}+</p>
            </div>
            <p style={{ maxWidth: "500px" }}>{film.description}</p>
          </div>

        </div>

      </div>
    </div>
  );
}