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
    email:"",
    password:""
  });

  useEffect(() => {
    if (loaded) return;

    setLoaded(true);

    api.get("/profil")
      .then(res => {
        setUser(res.data.user);
        setBookings(res.data.bookings);

        // form feltöltése
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
      phone_number: user.phone_number || ""
    });

    setEditMode(false);
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Profil</h2>

        {user && (
          <>
            {!editMode ? (
              <div>
                <p><strong>Név:</strong> {user.full_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Telefonszám:</strong> {user.phone_number || "Nincs megadva"}</p>

                <button onClick={() => setEditMode(true)}>
                  Szerkesztés
                </button>
              </div>
            ) : (
              //bevitel
              <div>
                <input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Név"/>
                <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Telefonszám"/>
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Új jelszó(opcionális)"/>
                
                <br /><br />
                <button onClick={handleSave}>Mentés</button>
                <button onClick={handleCancel}>Mégse</button>
              </div>
            )}
          </>
        )}

        <h3>Foglalások</h3>

        {bookings.length === 0 ? (
          <p>Nincs még foglalásod</p>
        ) : (
          <ul>
            {bookings.map(b => (
              <li key={b.konyveles_id}>
                🎬 {b.title} – 
                {new Date(b.start_time).toLocaleString("hu-HU")} – 
                {b.row_number}{b.seat_number} – 
                {b.final_price} Ft
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}