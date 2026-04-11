import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Filmek(){

  const navigate = useNavigate();
  const [films,setFilms] = useState([]);
  const [vetitesek,setVetitesek] = useState({});
  const [selectedDate,setSelectedDate] = useState(new Date());

  // következő 7 nap
  const days = [];
  for(let i=0;i<7;i++){
    const d = new Date();
    d.setDate(d.getDate()+i);
    days.push(d);
  }

  // vetítések lekérése
  const fetchVetitesek = async (filmId)=>{
    const res = await api.get(`/vetites/${filmId}`);

    setVetitesek(prev=>({
      ...prev,
      [filmId]:res.data
    }));
  }

  // filmek lekérése
  const fetchFilms = async ()=>{
    const res = await api.get("/filmek");
    setFilms(res.data);

    res.data.forEach(film=>{
      fetchVetitesek(film.film_id);
    });
  }

  useEffect(()=>{
    fetchFilms();
  },[]);

  return(
    <div>
      <div className="container">
        <h1 className="mb-4">Előadások</h1>

        <div className="d-flex gap-3 mb-2">

          {days.map((day,i)=>{

            const active = day.toDateString() === selectedDate.toDateString();
            const isToday = day.toDateString() === new Date().toDateString();

            return(
              <span
                key={i}
                onClick={()=>setSelectedDate(day)}
                style={{
                  cursor:"pointer",
                  fontWeight: active ? "bold" : "normal",
                  color: active ? "#ff7a00" : "#000",
                  borderBottom: active ? "2px solid #ff7a00" : "none",
                  paddingBottom:"3px"
                }}
              >
                {isToday
                  ? "Ma"
                  : day.toLocaleDateString("hu-HU",{weekday:"short"})
                }
              </span>
            )
          })}

        </div>

        <div style={{ marginBottom: "20px", fontWeight: "500" }}>
          {selectedDate.toLocaleDateString("hu-HU", {
            weekday: "long"
          }).toUpperCase()}{" "}
          {selectedDate.toLocaleDateString("hu-HU")
            .replace(/\./g,"/")
            .replace(/\s/g,"")}
        </div>

        {films
          .filter(film => {
            const vet = vetitesek[film.film_id] || [];

            return vet.some(v => {
              const d = new Date(v.start_time);
              return d.toDateString() === selectedDate.toDateString();
            });
          })
          .map(film=>(

          <div key={film.film_id} className="card mb-4 shadow p-3">

            <div className="d-flex">

              <img
                src={`/images/${film.film_img || "default.jpg"}`}
                alt={film.title}
                style={{
                  width: "150px",
                  height: "220px",
                  objectFit: "cover",
                  marginRight: "20px",
                  borderRadius: "10px"
                }}
              />

              <div>

                <h4
                  onClick={() => navigate(`/film/${film.film_id}`)}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => e.target.style.color = "#ff7a00"}
                  onMouseLeave={(e) => e.target.style.color = "black"}
                >
                  {film.title}
                </h4>

                <p>
                  {film.genre} | {film.duration_minutes} perc
                </p>

                <div>

                  {(() => {

                    const filtered = vetitesek[film.film_id]
                      ?.filter(v=>{
                        const d = new Date(v.start_time);
                        return d.toDateString() === selectedDate.toDateString();
                      }) || [];

                    // terem típus kiszedése (VIP / IMAX / Standard)
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
                      <div key={type} style={{ marginBottom: "10px" }}>

                        <div style={{ fontWeight: "bold", color: "#ff7a00" }}>
                          {type}
                        </div>

                        <div>
                          {grouped[type].map(v => (
                            <button
                              key={v.vetites_id}
                              className="btn btn-sm btn-primary me-2 mb-2"
                              onClick={() => navigate(`/foglalas/${v.vetites_id}`)}
                            >
                              {new Date(v.start_time).toLocaleTimeString("hu-HU",{
                                hour:"2-digit",
                                minute:"2-digit"
                              })}
                            </button>
                          ))}
                        </div>

                      </div>
                    ));

                  })()}

                </div>

              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}