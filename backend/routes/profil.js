import bcrypt from "bcrypt";

router.put("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { full_name, phone_number, email, password } = req.body;

    // alap update
    await db.query(
      "UPDATE users SET full_name = ?, phone_number = ?, email = ? WHERE user_id = ?",
      [full_name, phone_number, email, userId]
    );

    // jelszó csak ha meg van adva
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