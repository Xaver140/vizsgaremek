import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Filmreszlet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [film, setFilm] = useState(null);
  const [vetitesek, setVetitesek] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  useEffect(() => {
    api.get("/filmek").then(res => {
      const selected = res.data.find(f => f.film_id == id);
      setFilm(selected);
    });

    api.get(`/vetites/${id}`)
      .then(res => setVetitesek(res.data));
  }, [id]);

  if (!film) return <p className="text-white">Betöltés...</p>;

  return (
    <div className="container py-4">

      {/* header */}
      <div className="row mb-5">

        <div className="col-md-4 text-center mb-3">
          <img
            src={`/images/${film.film_img}`}
            alt={film.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "450px", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-8">

          <h2 className="fw-bold mb-3 film-title">{film.title}</h2>

          <div className="text-light mb-3">
            {film.genre} • {film.duration_minutes} perc • {film.age_limit}+
          </div>

          <div className="mb-3 text-secondary">
            <p><strong>Szereplők:</strong> {film.actors}</p>
            <p><strong>Rendező:</strong> {film.director}</p>
            <p><strong>Gyártó:</strong> {film.producer}</p>
            <p><strong>Kiadás:</strong> {film.release_year}</p>
          </div>

          <p className="text-light" style={{ maxWidth: "600px" }}>
            {film.description}
          </p>

        </div>
      </div>
      <div className="d-flex gap-3 mb-3 flex-wrap">

        {days.map((day,i)=>{

          const active = day.toDateString() === selectedDate.toDateString();
          const isToday = day.toDateString() === new Date().toDateString();

          return(
            <div
              key={i}
              onClick={()=>setSelectedDate(day)}
              style={{
                cursor:"pointer",
                background: active ? "#38bdf8" : "#334155",
                color: active ? "#000" : "#cbd5f5",
                padding:"10px",
                borderRadius:"8px",
                minWidth:"70px",
                textAlign:"center"
              }}
            >
              <div style={{fontSize:"14px"}}>
                {isToday ? "Ma" : day.toLocaleDateString("hu-HU",{weekday:"short"})}
              </div>
              <div style={{fontWeight:"bold"}}>
                {day.getDate()}
              </div>
            </div>
          )
        })}

      </div>

      <div className="mb-4 text-white">
        {selectedDate.toLocaleDateString("hu-HU",{weekday:"long"}).toUpperCase()}{" "}
        {selectedDate.toLocaleDateString("hu-HU").replace(/\./g,"/").replace(/\s/g,"")}
      </div>

      {(() => {

        const filtered = vetitesek.filter(v => {
          const d = new Date(v.start_time);
          return d.toDateString() === selectedDate.toDateString();
        });

        if (filtered.length === 0) {
          return <p className="text-secondary">Nincs vetítés ezen a napon</p>;
        }

        const getTeremType = (name) => {
          if (name.includes("VIP")) return "VIP";
          if (name.includes("IMAX")) return "IMAX";
          return "Standard";
        };

        const grouped = filtered.reduce((acc, v) => {
          const type = getTeremType(v.terem);
          if (!acc[type]) acc[type] = [];
          acc[type].push(v);
          return acc;
        }, {});

        return Object.keys(grouped).map(type => (
          <div key={type} className="mb-3">

            {/*terem és típus */}
            <span className={`badge me-2 ${
              type === "VIP" ? "bg-danger" :
              type === "IMAX" ? "bg-primary" :
              "bg-secondary"
            }`}>
              {type}
            </span>

            {grouped[type].map(v => (
              <button
                key={v.vetites_id}
                className="btn btn-sm me-2 mb-2"
                style={{
                  background: "#334155",
                  color: "#e5e7eb",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 12px"
                }}
                onClick={() => navigate(`/foglalas/${v.vetites_id}`)}
              >
                {new Date(v.start_time).toLocaleTimeString("hu-HU",{
                  hour:"2-digit",
                  minute:"2-digit"
                })}
              </button>
            ))}
          </div>
        ));
      })()}
    </div>
  );
}