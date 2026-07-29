const bcrypt = require("bcrypt");
const db = require("./config/db");

const seedAdmin = async () => {
  try {

    const [rows] = await db.query(
      "SELECT * FROM users WHERE username=?",
      ["Kyomya"]
    );

    if (rows.length > 0) {
      console.log("Admin already exists.");
      process.exit();
    }

    const password = await bcrypt.hash("admin123", 10);

    await db.query(
      `
      INSERT INTO users
      (
        full_name,
        username,
        password,
        role,
        status
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        "System Administrator",
        "admin",
        password,
        "Admin",
        "Active",
      ]
    );

    console.log("Default admin created.");

    process.exit();

  } catch (err) {

    console.error(err);

    process.exit();

  }
};

seedAdmin();