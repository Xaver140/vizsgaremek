import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./db.js";

//adatbázis teszt
db.query("SELECT 1")
  .then(() => console.log("✅ DB kapcsolat OK"))
  .catch((e) => console.error("❌ DB kapcsolat HIBA:", e.code, e.message));


import authRoutes from './routes/auth.js';
import adminRoutes from "./routes/admin.js";
import filmRoutes from './routes/filmek.js';
import vetitesRoutes from './routes/vetitesek.js';
import foglalasRoutes from './routes/foglalasok.js';
import profilRoutes from './routes/profil.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// esemény kiírás
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});


app.use('/auth', authRoutes);
app.use("/admin", adminRoutes);
app.use('/filmek', filmRoutes);
app.use('/vetites', vetitesRoutes);
app.use('/foglalas', foglalasRoutes);
app.use('/profil', profilRoutes);

app.get("/", (req, res) => res.send("Az alap index müködik!"));

app.listen(PORT, () => {
  console.log(`Backend fut a http://localhost:${PORT}`);
});