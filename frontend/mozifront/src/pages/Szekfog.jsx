import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Szekfog() {
  const { vetitesId } = useParams();

  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  // székek lekérése
  useEffect(() => {
    api.get(`/vetites/${vetitesId}/ulesek`)
      .then(res => setSeats(res.data))
      .catch(err => console.error(err));
  }, [vetitesId]);

  // csoportosítás sorok szerint (A, B, C)
  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row_number]) acc[seat.row_number] = [];
    acc[seat.row_number].push(seat);
    return acc;
  }, {});

  // foglalás
  const handleBooking = async () => {
    if (!selectedSeat) {
      alert("Válassz egy széket!");
      return;
    }

    try {
      await api.post("/foglalas", {
        vetites_id: vetitesId,
        ules_id: selectedSeat,
        final_price: 2200
      });

      alert("Foglalás sikeres!");
      window.location.reload();

    } catch (err) {
      alert(err.response?.data?.error || "Hiba történt");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Székfoglalás</h2>

        {/* vászon */}
        <div style={{
          textAlign: "center",
          marginBottom: "20px",
          background: "#ccc",
          padding: "10px"
        }}>
          Vászon
        </div>

        {/* székek */}
        {Object.keys(groupedSeats).map(row => (
          <div key={row} style={{ marginBottom: "10px" }}>
            <strong>{row}</strong>

            {groupedSeats[row].map(seat => (
              <button
                key={seat.ules_id}
                disabled={seat.foglalt}
                onClick={() => setSelectedSeat(seat.ules_id)}
                style={{
                  margin: "5px",
                  width: "50px",
                  height: "50px",
                  border: "none",
                  cursor: seat.foglalt ? "not-allowed" : "pointer",
                  backgroundColor: seat.foglalt
                    ? "red"
                    : selectedSeat === seat.ules_id
                    ? "blue"
                    : "green",
                  color: "white"
                }}
              >
                {seat.seat_number}
              </button>
            ))}
          </div>
        ))}

        {/* foglalás */}
        <button
          onClick={handleBooking}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px"
          }}
        >
          Foglalás
        </button>
      </div>
    </div>
  );
}