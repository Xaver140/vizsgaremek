import express from "express";
import db from "../db.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { vetites_id, ules_ids, final_price } = req.body;

  if (!ules_ids || ules_ids.length === 0) {
    return res.status(400).json({ error: "Nincs kiválasztott szék" });
  }

  if (ules_ids.length > 5) {
    return res.status(400).json({ error: "Maximum 5 hely foglalható" });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const insertedIds = []; // 🔥 EZ KELL

    for (const ules_id of ules_ids) {
      const [result] = await conn.query(`
        INSERT INTO konyveles (vetites_id, user_id, ules_id, final_price)
        VALUES (?, ?, ?, ?)
      `, [vetites_id, req.user.user_id, ules_id, final_price]);

      insertedIds.push(result.insertId); // 🔥
    }

    await conn.commit();

    res.json({
      message: "Foglalás sikeres",
      konyveles_ids: insertedIds // 🔥 FRONTENDNEK
    });

  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(400).json({ error: "A szék már foglalt" });
  } finally {
    conn.release();
  }
});

export default router;
