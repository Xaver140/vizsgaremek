import express from "express";
import db from "../db.js";
import auth from "../middleware/authmiddleware.js";

const router = express.Router();

//adatok lekérése a felhasználó foglalásairól
router.get("/", auth, async (req, res) => {
  const [rows] = await db.query(`
    SELECT k.*, f.title
    FROM konyveles k
    JOIN vetites v ON k.vetites_id = v.vetites_id
    JOIN filmek f ON v.film_id = f.film_id
    WHERE k.user_id = ?
  `, [req.user.user_id]);

  res.json(rows);
});

export default router;