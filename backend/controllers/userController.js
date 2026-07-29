const db = require("../config/db");
const bcrypt = require("bcryptjs");

// =======================================
// Login
// =======================================
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
        message: "Invalid username or password.",
      });
    }

    const user = rows[0];

    if (user.status === "Inactive") {
      return res.status(403).json({
        message: "This account has been deactivated.",
      });
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    res.json({
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

// =======================================
// Get Users
// =======================================
const getUsers = async (req, res) => {
  try {

    const [rows] = await db.query(
      `
      SELECT
      user_id,
      full_name,
      username,
      role,
      status
      FROM users
      ORDER BY full_name
      `
    );

    res.json(rows);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// =======================================
// Create User
// =======================================
const createUser = async (req, res) => {
  try {

    const {
      full_name,
      username,
      password,
      role,
    } = req.body;

    const [exists] = await db.query(
      `
      SELECT user_id
      FROM users
      WHERE username=?
      `,
      [username]
    );

    if (exists.length > 0) {
      return res.status(400).json({
        message: "Username already exists."
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      `
      INSERT INTO users
      (
      full_name,
      username,
      password,
      role
      )
      VALUES (?,?,?,?)
      `,
      [
        full_name,
        username,
        hashed,
        role,
      ]
    );

    res.status(201).json({
      message: "User created successfully."
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// =======================================
// Get Profile
// =======================================
const getProfile = async (req, res) => {
  try {

    const { user_id } = req.params;

    const [rows] = await db.query(
      `
      SELECT
      user_id,
      full_name,
      username
      FROM users
      WHERE user_id=?
      `,
      [user_id]
    );

    if (!rows.length) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    res.json(rows[0]);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// =======================================
// Update Profile
// =======================================
const updateProfile = async (req, res) => {
  try {

    const { user_id } = req.params;

    const {
      full_name,
      username,
      currentPassword,
      newPassword,
    } = req.body;

    const [rows] = await db.query(
      `
      SELECT *
      FROM users
      WHERE user_id=?
      `,
      [user_id]
    );

    if (!rows.length) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    const user = rows[0];

    const valid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!valid) {
      return res.status(400).json({
        message: "Current password is incorrect."
      });
    }

    const [usernameExists] = await db.query(
      `
      SELECT user_id
      FROM users
      WHERE username=?
      AND user_id<>?
      `,
      [
        username,
        user_id,
      ]
    );

    if (usernameExists.length > 0) {
      return res.status(400).json({
        message: "Username already exists."
      });
    }

    let password = user.password;

    if (
      newPassword &&
      newPassword.trim() !== ""
    ) {
      password = await bcrypt.hash(
        newPassword,
        10
      );
    }

    await db.query(
      `
      UPDATE users
      SET
      full_name=?,
      username=?,
      password=?
      WHERE user_id=?
      `,
      [
        full_name,
        username,
        password,
        user_id,
      ]
    );

    res.json({
      message: "Profile updated successfully."
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// =======================================
// Delete User
// =======================================
const deleteUser = async (req, res) => {
  try {

    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM users
      WHERE user_id=?
      `,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    if (rows[0].role === "Admin") {
      return res.status(400).json({
        message: "Administrator account cannot be deleted."
      });
    }

    await db.query(
      `
      DELETE FROM users
      WHERE user_id=?
      `,
      [id]
    );

    res.json({
      message: "User deleted successfully."
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  login,
  getUsers,
  createUser,
  getProfile,
  updateProfile,
  deleteUser,
};