// routes/admin.js

import express from "express";
import db from "../db.js";
import authMiddleware from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminmiddleware.js";
const router = express.Router();

/* ======================
   FILMEK (ADMIN CRUD)
   ====================== */

// Új film
router.post("/filmek", authMiddleware, adminMiddleware, async (req, res) => {
  const { title, description, duration_minutes, release_year, genre } = req.body;

  await db.query(`
    INSERT INTO filmek (title, description, duration_minutes, release_year, genre)
    VALUES (?, ?, ?, ?, ?)
  `, [title, description, duration_minutes, release_year, genre]);

  res.json({ message: "Film hozzáadva" });
});

// Film módosítás
router.put("/filmek/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const { title, description, duration_minutes, genre, is_active } = req.body;

  await db.query(`
    UPDATE filmek
    SET title = ?, description = ?, duration_minutes = ?, genre = ?, is_active = ?
    WHERE film_id = ?
  `, [title, description, duration_minutes, genre, is_active, req.params.id]);

  res.json({ message: "Film frissítve" });
});

// Film törlés (soft delete)
router.delete("/filmek/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await db.query(
    "UPDATE filmek SET is_active = 0 WHERE film_id = ?",
    [req.params.id]
  );

  res.json({ message: "Film deaktiválva" });
});


/* ======================
   VETÍTÉSEK (ADMIN CRUD)
   ====================== */

// Új vetítés
router.post("/vetitesek", authMiddleware, adminMiddleware, async (req, res) => {
  const { film_id, terem_id, start_time, base_price } = req.body;

  await db.query(`
    INSERT INTO vetites (film_id, terem_id, start_time, base_price)
    VALUES (?, ?, ?, ?)
  `, [film_id, terem_id, start_time, base_price]);

  res.json({ message: "Vetítés létrehozva" });
});

// Vetítés módosítás
router.put("/vetitesek/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const { start_time, base_price, is_full } = req.body;

  await db.query(`
    UPDATE vetites
    SET start_time = ?, base_price = ?, is_full = ?
    WHERE vetites_id = ?
  `, [start_time, base_price, is_full, req.params.id]);

  res.json({ message: "Vetítés frissítve" });
});

// Vetítés törlés
router.delete("/vetitesek/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await db.query(
    "DELETE FROM vetites WHERE vetites_id = ?",
    [req.params.id]
  );

  res.json({ message: "Vetítés törölve" });
});

export default router;
