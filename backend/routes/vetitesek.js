import express from "express";
import db from "../db.js";
const router = express.Router();

// Összes szék + foglalt
router.get("/:vetitesId/ulesek", async (req, res) => {
  const [rows] = await db.query(`
    SELECT u.ules_id, u.row_number, u.seat_number,
      CASE 
        WHEN k.konyveles_id IS NULL THEN 0
        ELSE 1
      END AS foglalt
    FROM vetites v
    JOIN ules u ON u.terem_id = v.terem_id
    LEFT JOIN konyveles k ON k.ules_id = u.ules_id AND k.vetites_id = v.vetites_id
    WHERE v.vetites_id = ?
    ORDER BY u.row_number, u.seat_number
  `, [req.params.vetitesId]);

  res.json(rows);
});
router.get("/:filmId", async (req, res) => {
  const [rows] = await db.query(`
    SELECT v.*, t.name AS terem
    FROM vetites v
    JOIN terem t ON v.terem_id = t.terem_id
    WHERE v.film_id = ?
  `, [req.params.filmId]);

  res.json(rows);
});

export default router;