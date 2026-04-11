import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Filmek(){

  const navigate = useNavigate();
  const [films,setFilms] = useState([]);
  const [vetitesek,setVetitesek] = useState({});
  const [selectedDate,setSelectedDate] = useState(new Date());

  const days = [];
  for(let i=0;i<7;i++){
    const d = new Date();
    d.setDate(d.getDate()+i);
    days.push(d);
  }

  const fetchVetitesek = async (filmId)=>{
    const res = await api.get(`/vetites/${filmId}`);
    setVetitesek(prev=>({...prev,[filmId]:res.data}));
  }

  const fetchFilms = async ()=>{
    const res = await api.get("/filmek");
    setFilms(res.data);
    res.data.forEach(f=>fetchVetitesek(f.film_id));
  }

  useEffect(()=>{ fetchFilms(); },[]);

  return(
    <div className="container py-4">

      <h2 className="mb-4 fw-bold"> Előadások</h2>

      <div className="d-flex gap-3 mb-3 flex-wrap">

        {days.map((day,i)=>{

          const active = day.toDateString() === selectedDate.toDateString();
          const isToday = day.toDateString() === new Date().toDateString();

          return(
            <div
              key={i}
              onClick={()=>setSelectedDate(day)}
              className={`px-3 py-2 rounded text-center`}
              style={{
                cursor:"pointer",
                background: active ? "#38bdf8" : "#334155",
                color: active ? "#000" : "#cbd5f5",
                minWidth:"70px"
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

      {/* A teljes dátum */}
      <div className="mb-4 text-white">
        {selectedDate.toLocaleDateString("hu-HU",{weekday:"long"}).toUpperCase()}{" "}
        {selectedDate.toLocaleDateString("hu-HU").replace(/\./g,"/").replace(/\s/g,"")}
      </div>

      {/* Filmek sorolása */}
      {films
        .filter(film => {
          const vet = vetitesek[film.film_id] || [];
          return vet.some(v => new Date(v.start_time).toDateString() === selectedDate.toDateString());
        })
        .map(film=>(

        <div key={film.film_id} className="card mb-4 border-0 shadow-sm">
          <div className="row g-0">
            <div className="col-4 col-md-2">
              <img
                src={`/images/${film.film_img || "default.jpg"}`}
                alt={film.title}
                className="img-fluid rounded-start"
                style={{
                  height:"100%",
                  objectFit:"cover"
                }}
              />
            </div>

            <div className="col-8 col-md-10 p-3">

              <h5
                onClick={() => navigate(`/film/${film.film_id}`)}
                style={{ cursor:"pointer" }}
                className="fw-bold mb-1 film-title"
              >
                {film.title}
              </h5>

              <div className="text-muted mb-3">
                {film.genre} • {film.duration_minutes} perc
              </div>

              {(() => {

                const filtered = vetitesek[film.film_id]
                  ?.filter(v => new Date(v.start_time).toDateString() === selectedDate.toDateString()) || [];

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
                  <div key={type} className="mb-2">

                    <span className="badge bg-warning text-dark me-2">
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
                          padding: "6px 12px",
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
          </div>
        </div>
      ))}
    </div>
  )
}