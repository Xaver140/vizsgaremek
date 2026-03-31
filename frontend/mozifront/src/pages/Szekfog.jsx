import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Szekfog() {
  const { vetitesId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // adatok lekérése
  useEffect(() => {
    api.get(`/vetites/${vetitesId}/ulesek`)
      .then(res => setSeats(res.data));
  }, []);

  // csoportosítás sorok szerint
  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row_number]) acc[seat.row_number] = [];
    acc[seat.row_number].push(seat);
    return acc;
  }, {});

  // foglalt?
  const isBooked = (seat) => seat.foglalt === 1;

  // kiválasztott?
  const isSelected = (seat) => {
    return selectedSeats.some(s => s.row_number === seat.row_number && s.seat_number === seat.seat_number);
  };

  // kattintás
  const handleSeatClick = (seat) => {
  if (isBooked(seat)) return;

  if (isSelected(seat)) {
    // kivétel
    setSelectedSeats(prev =>
      prev.filter(
        s =>
          !(s.row_number === seat.row_number &&
            s.seat_number === seat.seat_number)
      )
    );
  } else {
    // foglalás limit!!!!!
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

    try
    {
      const res = await api.post("/foglalas", {
        vetites_id: vetitesId,
        ules_ids: selectedSeats.map(s => s.ules_id),
        final_price: 2200 * selectedSeats.length
      });


      alert("Foglalás sikeres!");
      navigate("/fizetes", {
        state: {
        konyveles_ids: res.data.konyveles_ids,
        amount: 2200 * selectedSeats.length
        }
      });

    } catch (err) {
      alert(err.response?.data?.error || "Hiba történt");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Székfoglalás</h2>

        <div style={{
          textAlign: "center",
          marginBottom: "20px",
          background: "#ccc",
          padding: "10px"
        }}>
          Vászon
        </div>

        <p>Zöld Szabad | Narancs Kiválasztott | fekete/szürke Foglalt</p>

        {/* székek */}
        {Object.keys(groupedSeats).map(row => (
          <div key={row} style={{ marginBottom: "10px" }}>
            <strong>{row}</strong>

            {groupedSeats[row].map(seat => (
              <button
                key={seat.ules_id}
                onClick={() => handleSeatClick(seat)}
                style={{
                  margin: "5px",
                  width: "50px",
                  height: "50px",
                  border: "none",
                  cursor: isBooked(seat) ? "not-allowed" : "pointer",

                  backgroundColor:
                    isBooked(seat)
                      ? "gray"
                      : isSelected(seat)
                      ? "orange"
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