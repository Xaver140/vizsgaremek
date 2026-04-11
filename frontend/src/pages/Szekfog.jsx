import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";


export default function Szekfog() {
  const { vetitesId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    api.get(`/vetites/${vetitesId}/ulesek`)
      .then(res => setSeats(res.data));
  }, []);

  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row_number]) acc[seat.row_number] = [];
    acc[seat.row_number].push(seat);
    return acc;
  }, {});

  const isBooked = (seat) => seat.foglalt === 1;

  const isSelected = (seat) =>
    selectedSeats.some(s => s.ules_id === seat.ules_id);

  const handleSeatClick = (seat) => {
    if (isBooked(seat)) return;

    if (isSelected(seat)) {
      setSelectedSeats(prev =>
        prev.filter(s => s.ules_id !== seat.ules_id)
      );
    } else {
      if (selectedSeats.length >= 5) {
        alert("Maximum 5 helyet választhatsz!");
        return;
      }
      setSelectedSeats(prev => [...prev, seat]);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Válassz széket!");
      return;
    }

    try {
      const res = await api.post("/foglalas", {
        vetites_id: vetitesId,
        ules_ids: selectedSeats.map(s => s.ules_id),
        final_price: 2200 * selectedSeats.length
      });

      navigate("/fizetes", {
        state: {
          konyveles_ids: res.data.konyveles_ids,
          amount: 2200 * selectedSeats.length
        }
      });

    } catch (err) {
      if (err.response?.status === 401) {
        alert("Bejelentkezés szükséges!");
        navigate("/login");
      } else {
        alert("Hiba történt");
      }
    }
  };

  return (
    <div className="container py-4 text-center">

      <h2 className="mb-4 text-white"> Székfoglalás</h2>

      {/*vászon*/}
      <div style={{
        background: "#94a3b8",
        height: "40px",
        marginBottom: "30px",
      }}>
        <span style={{ color: "#000", fontWeight: "bold" }}>VÁSZON</span>
      </div>

      {/* Székek fajtái */}
      <div className="d-flex justify-content-center gap-4 mb-4 text-light">

        <div><span className="seat free"></span> Szabad</div>
        <div><span className="seat selected"></span> Kiválasztott</div>
        <div><span className="seat booked"></span> Foglalt</div>

      </div>

      {Object.keys(groupedSeats).map(row => (
        <div key={row} className="mb-2">

          <span className="text-secondary me-2">{row}</span>

          {groupedSeats[row].map(seat => (
            <span
              key={seat.ules_id}
              onClick={() => handleSeatClick(seat)}
              className={`seat 
                ${isBooked(seat) ? "booked" : ""}
                ${isSelected(seat) ? "selected" : ""}
              `}
            >
              {seat.seat_number}
            </span>
          ))}

        </div>
      ))}

      <div className="mt-4 text-light">
        Kiválasztott helyek: {selectedSeats.map(s => `${s.row_number}${s.seat_number}`).join(", ") || "Nincs"}
      </div>

      <button
        onClick={handleBooking}
        className="btn mt-4"
        style={{
          background: "#38bdf8",
          color: "black",
          padding: "10px 25px",
          borderRadius: "10px",
          fontWeight: "bold"
        }}
      >
        Foglalás ({selectedSeats.length})
      </button>
    </div>
  );
}