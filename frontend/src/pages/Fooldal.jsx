import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Fooldal() {

  const [films, setFilms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/filmek")
      .then(res => setFilms(res.data));
  }, []);

  return (
    <div>

      {/* hero */}
      <div style={{
        position: "relative",
        height: "400px",
        backgroundImage: "url('/images/mozihero.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)"
        }}></div>

        <div style={{ position: "relative", color: "white", textAlign: "center" }}>
          <h1>Köszöntjük mozinkban</h1>
          <p>Fedezd fel a legjobb filmeket!</p>
        </div>
      </div>
      <div className="container mt-5">

        <h2 className="mb-4 text-center">Műsoron</h2>

        <div className="row">

          {films.map(film => (

            <div key={film.film_id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">

              <div
                onClick={() => navigate(`/film/${film.film_id}`)}
                style={{
                  cursor: "pointer",
                  textAlign: "center"
                }}
              >

                <img
                  src={`/images/${film.film_img}`}
                  alt={film.title}
                  style={{
                    width: "100%",
                    aspectRatio: "2/3",
                    objectFit: "cover",
                    borderRadius: "12px",
                    transition: "0.3s"
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />

                {/* CÍM */}
                <p style={{
                  marginTop: "10px",
                  fontWeight: "500"
                }}>
                  {film.title}
                </p>

              </div>

            </div>

          ))}

        </div>
      </div>

    </div>
  );
}