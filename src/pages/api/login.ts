import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite3";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const dbFile = process.env.DB_FILE;
const secretKey = process.env.JWT_SECRET_KEY || "default-secret-key";

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, password } = req.body;

  try {
    const db = await open({
      filename: dbFile,
      driver: sqlite3.Database,
    });

    const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });

    await db.run(
      "INSERT INTO jwt (id, token, timestamp) VALUES (?, ?, CURRENT_TIMESTAMP)",
      [user.id, token]
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default loginHandler;
