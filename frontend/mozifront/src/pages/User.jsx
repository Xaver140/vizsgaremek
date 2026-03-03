import { useEffect, useState } from "react";
import api from "../api/api";

export default function Userkezelo() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    api.get("/filmek")
      .then(res => setFilms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Felhasználói kezelő</h1>
      <ul>
        {films.map(film => (
          <li key={film.id}>{film.title}</li>
        ))}
      </ul>
    </div>
  );
}