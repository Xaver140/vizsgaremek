import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Filmreszlet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [film, setFilm] = useState(null);
  const [vetitesek, setVetitesek] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 7 nap
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  useEffect(() => {

    // film adatok
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

        <h3 style={{ marginTop: "30px" }}>Vetítések</h3>

        <div style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px"
        }}>
          {days.map((day, i) => {
            const active =
              day.toDateString() === selectedDate.toDateString();

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(day)}
                style={{
                  background: active ? "#ff7a00" : "#ddd",
                  color: active ? "white" : "black",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                {day.toLocaleDateString("hu-HU", { weekday: "short" })}
                <br />
                {day.getDate()}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {vetitesek
            .filter(v => {
              const d = new Date(v.start_time);
              return d.toDateString() === selectedDate.toDateString();
            })
            .map(v => (
              <button
                key={v.vetites_id}
                onClick={() => navigate(`/foglalas/${v.vetites_id}`)}
                className="btn btn-warning"
              >
                {new Date(v.start_time).toLocaleTimeString("hu-HU", {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </button>
            ))
          }
        </div>

        {vetitesek.filter(v => {
          const d = new Date(v.start_time);
          return d.toDateString() === selectedDate.toDateString();
        }).length === 0 && (
          <p style={{ marginTop: "10px" }}>
            Nincs vetítés ezen a napon
          </p>
        )}

      </div>
    </div>
  );
}