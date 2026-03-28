import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// REGISZTRÁCIÓ
router.post("/register", async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    // email ellenőrzés
    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length) {
      return res.status(400).json({ error: "Email már létezik" });
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)",
      [email, hash, full_name]
    );

    res.json({ message: "Sikeres regisztráció" });

  } catch (err) {
    console.error("Reg hiba:", err);
    res.status(500).json({
      error: err.message,
      code: err.code
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({ error: "Hibás email vagy jelszó" });
    }

    const user = rows[0];

    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) {
      return res.status(401).json({ error: "Hibás email vagy jelszó" });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        is_admin: user.is_admin
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    console.error("Login hiba:", err);
    res.status(500).json({ error: "Szerver hiba" });
  }
});

export default router;