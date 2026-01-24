import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from './routes/auth.js';
import adminRoutes from "./routes/admin.js";
import filmRoutes from './routes/filmek.js';
import vetitesRoutes from './routes/vetitesek.js';
import foglalasRoutes from './routes/foglalasok.js';
import profilRoutes from './routes/profil.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use("/admin", adminRoutes);
app.use('/filmek', filmRoutes);
app.use('/vetites', vetitesRoutes);
app.use('/foglalas', foglalasRoutes);
app.use('/profil', profilRoutes);

app.get("/", (req, res) => res.send("Mozis backend JWT-vel ✅"));

app.listen(PORT, () => {
  console.log(`Backend fut a http://localhost:${PORT}`);
});