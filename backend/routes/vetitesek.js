import express from "express";
import db from "../db.js";
const router = express.Router();

// Vetítések filmhez
router.get("/:filmId", async (req, res) => {
  const [rows] = await db.query(`
    SELECT v.*, t.name AS terem
    FROM vetites v
    JOIN terem t ON v.terem_id = t.terem_id
    WHERE v.film_id = ?
  `, [req.params.filmId]);

  res.json(rows);
});

// Foglalt székek 
router.get("/:vetitesId/ulesek", async (req, res) => {
  const [rows] = await db.query(`
    SELECT u.row_number, u.seat_number
    FROM konyveles k
    JOIN ules u ON k.ules_id = u.ules_id
    WHERE k.vetites_id = ?
  `, [req.params.vetitesId]);

  res.json(rows);
});

export default router;