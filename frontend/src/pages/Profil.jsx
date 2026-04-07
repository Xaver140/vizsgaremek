import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

export default function Profil() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (loaded) return;

    setLoaded(true);

    api.get("/profil")
      .then(res => {
        setUser(res.data.user);
        setBookings(res.data.bookings);

        setFormData({
          full_name: res.data.user.full_name,
          phone_number: res.data.user.phone_number || "",
          email: res.data.user.email,
          password: ""
        });
      })
      .catch(() => alert("Nem vagy bejelentkezve"));
  }, [loaded]);

  // input változás
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // mentés
  const handleSave = async () => {
    try {
      const dataToSend = { ...formData };

      if (!dataToSend.password) {
        delete dataToSend.password;
      }

      await api.put("/profil", dataToSend);

      setUser({
        ...user,
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        email: formData.email
      });

      setEditMode(false);

    } catch {
      alert("Hiba mentéskor");
    }
  };

  // mégse
  const handleCancel = () => {
    setFormData({
      full_name: user.full_name,
      phone_number: user.phone_number || "",
      email: user.email,
      password: ""
    });

    setEditMode(false);
  };

  // 🔥 FOGLALÁSOK CSOPORTOSÍTÁSA (JAVÍTOTT)
  const groupedBookings = Object.values(
  bookings.reduce((acc, b) => {

    const date = new Date(b.booking_time);

    const safeDate = isNaN(date)
      ? "no-date"
      : date.toISOString().slice(0, 19);

    const key = `${b.vetites_id}-${safeDate}`;

    if (!acc[key]) {
      acc[key] = {
        ...b,
        seats: [],
        total: Number(b.final_price)
      };
    }

    acc[key].seats.push(`${b.row_number}${b.seat_number}`);

    return acc;
  }, {})
);

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2>Profil</h2>

        {user && (
          <>
            {!editMode ? (
              <div className="card mb-4">
                <div className="card-body">
                  <p><strong>Név:</strong> {user.full_name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Telefonszám:</strong> {user.phone_number || "Nincs megadva"}</p>

                  <button onClick={() => setEditMode(true)} className="btn btn-primary">
                    Szerkesztés
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-3 mb-4">
                <input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Név"
                  className="form-control mb-2"
                />
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Telefonszám"
                  className="form-control mb-2"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="form-control mb-2"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Új jelszó (opcionális)"
                  className="form-control mb-2"
                />

                <div className="mt-2">
                  <button onClick={handleSave} className="btn btn-success me-2">
                    Mentés
                  </button>
                  <button onClick={handleCancel} className="btn btn-secondary">
                    Mégse
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <h3>Foglalások</h3>

        {groupedBookings.length === 0 && (
          <p>Nincs még foglalásod.</p>
        )}

        {groupedBookings.map((b, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">

              <h4>{b.title}</h4>

              <p>
                <strong>Dátum:</strong>{" "}
                {new Date(b.start_time).toLocaleString("hu-HU")}
              </p>

              <p>
                <strong>Helyek:</strong> {b.seats.join(", ")}
              </p>

              <p>
                <strong>Összesen:</strong>{" "}
                {b.total.toLocaleString("hu-HU")} Ft
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}