const db = require("../config/db");

// // Get All Borrowers
// const getBorrowers = async (req, res) => {
//   try {
//     const [rows] = await db.query(
//       "SELECT * FROM borrowers ORDER BY borrower_id DESC"
//     );

//     res.json(rows);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to fetch borrowers",
//     });
//   }
// };

// Get Single Borrower + Loans
const getBorrower = async (req, res) => {
  try {
    const { id } = req.params;

    // Get borrower
    const [borrowerRows] = await db.query(
      `
      SELECT *
      FROM borrowers
      WHERE borrower_id = ?
      `,
      [id]
    );

    if (borrowerRows.length === 0) {
      return res.status(404).json({
        message: "Borrower not found",
      });
    }

    // Get borrower's loans
    const [loanRows] = await db.query(
      `
      SELECT
        loan_id,
        borrower_id,
        principal_amount,
        interest_rate,
        duration_value,
        duration_unit,
        interest_amount,
        total_amount,
        monthly_installment,
        amount_paid,
        balance,
        loan_date,
        due_date,
        status,
        created_at
      FROM loans
      WHERE borrower_id = ?
      ORDER BY loan_id DESC
      `,
      [id]
    );

    res.json({
      borrower: borrowerRows[0],
      loans: loanRows,
    });

  } catch (error) {
    console.error("Get borrower error:", error);

    res.status(500).json({
      message: "Failed to fetch borrower",
      error: error.message,
    });
  }
};

// Get Single Borrower
const getBorrower = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM borrowers WHERE borrower_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Borrower not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch borrower",
    });
  }
};

// Create Borrower
const createBorrower = async (req, res) => {
  try {
    const {
      full_name,
      phone,
      email,
      address,
      national_id,
    } = req.body;

    const [result] = await db.query(
      `
      INSERT INTO borrowers
      (
        full_name,
        phone,
        email,
        address,
        national_id
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        full_name,
        phone,
        email,
        address,
        national_id,
      ]
    );

    res.status(201).json({
      message: "Borrower created",
      borrower_id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create borrower",
    });
  }
};

// Update Borrower
const updateBorrower = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      full_name,
      phone,
      email,
      address,
      national_id,
    } = req.body;

    await db.query(
      `
      UPDATE borrowers
      SET
      full_name = ?,
      phone = ?,
      email = ?,
      address = ?,
      national_id = ?
      WHERE borrower_id = ?
      `,
      [
        full_name,
        phone,
        email,
        address,
        national_id,
        id,
      ]
    );

    res.json({
      message: "Borrower updated",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update borrower",
    });
  }
};

// Delete Borrower
const deleteBorrower = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM borrowers WHERE borrower_id = ?",
      [id]
    );

    res.json({
      message: "Borrower deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete borrower",
    });
  }
};

module.exports = {
  getBorrowers,
  getBorrower,
  createBorrower,
  updateBorrower,
  deleteBorrower,
};