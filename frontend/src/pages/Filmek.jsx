import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

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
      <Navbar/>

      <div className="container">
        <h1 className="mb-4">Előadások</h1>

        {/* nap választó */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {days.map((day,i)=>{

            const active =
              day.toDateString() === selectedDate.toDateString();

            return(
              <button
                key={i}
                onClick={()=>setSelectedDate(day)}
                className={`btn ${active ? "btn-warning text-white" : "btn-outline-secondary"}`}
              >
                {day.toLocaleDateString("hu-HU",{weekday:"short"})}
                <br/>
                {day.getDate()}
              </button>
            )
          })}
        </div>

        {/* film lista */}
        {films.map(film=>(

          <div key={film.film_id} className="card mb-4 shadow p-3">

            <div className="d-flex">

              {/* KÉP */}
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

              {/* INFÓK */}
              <div>

                <h4>{film.title}</h4>

                <p>
                  {film.genre} | {film.duration_minutes} perc
                </p>

                {/* vetítések */}
                <div>
                  {vetitesek[film.film_id]
                    ?.filter(v=>{
                      const vetitesDate = new Date(v.start_time);
                      return(
                        vetitesDate.toDateString() === selectedDate.toDateString()
                      )
                    })
                    .map(v=>(
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
                    ))
                  }
                </div>

              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}