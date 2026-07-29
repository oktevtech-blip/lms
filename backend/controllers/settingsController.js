const db = require("../config/db");

const getSettings = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM settings LIMIT 1"
    );

    res.json(rows[0] || {});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateSettings = async (
  req,
  res
) => {
  try {
    const {
      company_name,
      phone,
      email,
      address,
      default_interest,
      loan_duration,
      currency,
    } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM settings LIMIT 1"
    );

    if (!rows.length) {
      await db.query(
        `
        INSERT INTO settings
        (
          company_name,
          phone,
          email,
          address,
          default_interest,
          loan_duration,
          currency
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          company_name,
          phone,
          email,
          address,
          default_interest,
          loan_duration,
          currency,
        ]
      );
    } else {
      await db.query(
        `
        UPDATE settings
        SET
          company_name=?,
          phone=?,
          email=?,
          address=?,
          default_interest=?,
          loan_duration=?,
          currency=?
        WHERE setting_id=?
        `,
        [
          company_name,
          phone,
          email,
          address,
          default_interest,
          loan_duration,
          currency,
          rows[0].setting_id,
        ]
      );
    }

    res.json({
      message: "Settings saved",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};