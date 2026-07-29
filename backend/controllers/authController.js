const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query(
      `
      SELECT *
      FROM users
      WHERE username = ?
      `,
      [username]
    );

    if (!rows.length) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const user = rows[0];

    if (user.status !== "Active") {
      return res.status(403).json({
        message: "Your account is inactive.",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "lms_secret_key",
      {
        expiresIn: "24h",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        username: user.username,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  login,
};