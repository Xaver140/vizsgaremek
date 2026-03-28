import express from "express";
import db from "../db.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { konyveles_ids, amount, method } = req.body;

  try {
    for (const id of konyveles_ids) {
      await db.query(`
        INSERT INTO fizetes (konyveles_id, amount, method, status)
        VALUES (?, ?, ?, 'completed')
      `, [id, amount, method]);

      await db.query(`
        UPDATE konyveles SET status = 'confirmed'
        WHERE konyveles_id = ?
      `, [id]);
    }

    res.json({ message: "Fizetés sikeres" });

  } catch (err) {
    res.status(500).json({ error: "Fizetési hiba" });
  }
});

export default router;