import bcrypt from "bcrypt";
import authMiddleware from "../middleware/authmiddleware.js";
import express from "express";
import db from "../db.js";

const router = express.Router();
// A felhasználó adatai + a foglalásai
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.user_id;

    // user adatok
    const [userRows] = await db.query(
      "SELECT user_id, email, full_name, phone_number FROM users WHERE user_id = ?",
      [userId]
    );

    // foglalások
    const [bookingRows] = await db.query(`
      SELECT k.konyveles_id, f.title, v.start_time, u.row_number, u.seat_number, k.final_price
      FROM konyveles k
      JOIN vetites v ON k.vetites_id = v.vetites_id
      JOIN filmek f ON v.film_id = f.film_id
      JOIN ules u ON k.ules_id = u.ules_id
      WHERE k.user_id = ?
      ORDER BY v.start_time DESC
    `, [userId]);

    res.json({
      user: userRows[0],
      bookings: bookingRows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba profil lekérésnél" });
  }
});

// a profil belül szerkesztés
router.put("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { full_name, phone_number, email, password } = req.body;

    // alap update
    await db.query(
      "UPDATE users SET full_name = ?, phone_number = ?, email = ? WHERE user_id = ?",
      [full_name, phone_number, email, userId]
    );

    // jelszó csak ha meg van adva(bejelentkezve)
    if (password && password.trim() !== "") {
      const hash = await bcrypt.hash(password, 10);

      await db.query(
        "UPDATE users SET password_hash = ? WHERE user_id = ?",
        [hash, userId]
      );
    }

    res.json({ message: "Profil frissítve" });

  } catch (err) {
    res.status(500).json({ error: "Hiba mentéskor" });
  }
});
export default router;