import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

export default function Fooldal() {
  const [films, setFilms] = useState([]);
  const scrollRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/filmek").then(res => setFilms(res.data));
  }, []);

  const scroll = (direction) => {
    const scrollAmount = 400;

    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar />

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>MŰSORON</h2>

      <div style={{ position: "relative", width: "100%" }}>

        {/* BAL NYÍL */}
        <button onClick={() => scroll("left")} style={arrowStyle("left")}>
          ❮
        </button>

        {/* FILM SOR */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            padding: "20px",
            scrollBehavior: "smooth"
          }}
        >
          {films.map(film => (
            <div key={film.film_id} style={{ minWidth: "180px" }}>

              <img
                src={`/images/${film.film_img}`}
                alt={film.title}
                onClick={() => navigate(`/film/${film.film_id}`)}
                style={{
                  width: "180px",
                  height: "270px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "0.3s"
                }}
              />

              <p style={{
                color: "white",
                marginTop: "5px",
                fontSize: "14px"
              }}>
                {film.title}
              </p>

            </div>
          ))}
        </div>

        {/* JOBB NYÍL */}
        <button onClick={() => scroll("right")} style={arrowStyle("right")}>
          ❯
        </button>

      </div>
    </div>
  );
}

const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "10px",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.6)",
  color: "white",
  border: "none",
  fontSize: "30px",
  padding: "10px 15px",
  cursor: "pointer",
  borderRadius: "5px",
  zIndex: 10
});