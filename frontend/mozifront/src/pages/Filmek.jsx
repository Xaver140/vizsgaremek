import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Filmek(){

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

  //filmek és vetítések apiból
  const fetchVetitesek = async (filmId)=>{
    const res = await api.get(`/vetites/${filmId}`);

    setVetitesek(prev=>({
      ...prev,
      [filmId]:res.data
    }));
  }

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
        <h1>Előadások</h1>

        {/* nap választó */}
        <div style={{
          display:"flex",
          gap:"10px",
          marginBottom:"20px"
        }}>

          {days.map((day,i)=>{

            const active =
              day.toDateString() === selectedDate.toDateString();

            return(

              <button
                key={i}
                onClick={()=>setSelectedDate(day)}
                style={{
                  background:active ? "#ff7a00":"#ddd",
                  color:active ? "white":"black"
                }}
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

          <div key={film.film_id} className="film-card">

            <h2>{film.title}</h2>

            <p> {film.genre} | {film.duration_minutes} perc</p>
            <div className="vetitesek">

              {vetitesek[film.film_id]
                ?.filter(v=>{
                  const vetitesDate = new Date(v.start_time);

                  return(
                    vetitesDate.toDateString() ===selectedDate.toDateString()
                  )
                })
                .map(v=>(
                  <button key={v.vetites_id}>{new Date(v.start_time).toLocaleTimeString("hu-HU",{hour:"2-digit",minute:"2-digit"})}</button>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}