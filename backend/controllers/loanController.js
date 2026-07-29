const db = require("../config/db");

// ===============================
// Get All Loans
// ===============================
const getLoans = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        l.*,
        b.full_name
      FROM loans l
      JOIN borrowers b
        ON l.borrower_id = b.borrower_id
      ORDER BY l.loan_id DESC
    `);

    res.json(rows);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ===============================
// Get One Loan
// ===============================
const getLoan = async (req, res) => {
  try {

    const [loanRows] = await db.query(
      `
      SELECT
        l.*,
        b.full_name
      FROM loans l
      JOIN borrowers b
        ON l.borrower_id = b.borrower_id
      WHERE l.loan_id = ?
      `,
      [req.params.id]
    );

    if (!loanRows.length) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    const [payments] = await db.query(
      `
      SELECT *
      FROM payments
      WHERE loan_id = ?
      ORDER BY payment_date DESC
      `,
      [req.params.id]
    );

    const [schedule] = await db.query(
      `
      SELECT *
      FROM loan_schedule
      WHERE loan_id = ?
      ORDER BY installment_no
      `,
      [req.params.id]
    );

    res.json({
      loan: loanRows[0],
      payments,
      schedule,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ===============================
// Create Loan
// ===============================
const createLoan = async (req, res) => {

  const connection = await db.getConnection();

  try {

    await connection.beginTransaction();

    const {
      borrower_id,
      principal_amount,
      interest_rate,
      duration_value,
      duration_unit,
      loan_date,
      due_date,
    } = req.body;

    const principal = Number(principal_amount);
    const interestRate = Number(interest_rate);
    const duration = Number(duration_value);

    const interest_amount =
      (principal * interestRate) / 100;

    const total_amount =
      principal + interest_amount;

    const installment_amount =
      total_amount / duration;

    const balance = total_amount;

    const [result] = await connection.query(
      `
      INSERT INTO loans
      (
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
        due_date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        borrower_id,
        principal,
        interestRate,
        duration,
        duration_unit,
        interest_amount,
        total_amount,
        installment_amount,
        0,
        balance,
        loan_date,
        due_date,
      ]
    );

    const loan_id = result.insertId;

    const startDate = new Date(loan_date);

    for (let i = 1; i <= duration; i++) {

      const installmentDate = new Date(startDate);

      switch (duration_unit) {

        case "Days":
          installmentDate.setDate(
            installmentDate.getDate() + i
          );
          break;

        case "Weeks":
          installmentDate.setDate(
            installmentDate.getDate() + (i * 7)
          );
          break;

        case "Months":
          installmentDate.setMonth(
            installmentDate.getMonth() + i
          );
          break;

        case "Years":
          installmentDate.setFullYear(
            installmentDate.getFullYear() + i
          );
          break;

        default:
          installmentDate.setMonth(
            installmentDate.getMonth() + i
          );
      }

      const scheduleDate =
        installmentDate
          .toISOString()
          .split("T")[0];

      await connection.query(
        `
        INSERT INTO loan_schedule
        (
          loan_id,
          installment_no,
          due_date,
          amount_due,
          amount_paid,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          loan_id,
          i,
          scheduleDate,
          installment_amount,
          0,
          "Pending",
        ]
      );

    }

    await connection.commit();

    res.status(201).json({
      message: "Loan created successfully.",
      loan_id,
    });

  } catch (error) {

    await connection.rollback();

    res.status(500).json({
      message: error.message,
    });

  } finally {

    connection.release();

  }
};

// ===============================
// Update Loan Status
// ===============================
const updateLoanStatus = async (req, res) => {
  try {

    await db.query(
      `
      UPDATE loans
      SET status = ?
      WHERE loan_id = ?
      `,
      [
        req.body.status,
        req.params.id,
      ]
    );

    res.json({
      message: "Loan status updated.",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ===============================
// Delete Loan
// ===============================
const deleteLoan = async (req, res) => {

  const connection = await db.getConnection();

  try {

    await connection.beginTransaction();

    const loanId = req.params.id;

    await connection.query(
      `
      DELETE FROM loan_schedule
      WHERE loan_id = ?
      `,
      [loanId]
    );

    await connection.query(
      `
      DELETE FROM payments
      WHERE loan_id = ?
      `,
      [loanId]
    );

    const [result] = await connection.query(
      `
      DELETE FROM loans
      WHERE loan_id = ?
      `,
      [loanId]
    );

    if (result.affectedRows === 0) {

      await connection.rollback();

      return res.status(404).json({
        message: "Loan not found",
      });

    }

    await connection.commit();

    res.json({
      message: "Loan deleted successfully.",
    });

  } catch (error) {

    await connection.rollback();

    res.status(500).json({
      message: error.message,
    });

  } finally {

    connection.release();

  }
};

module.exports = {
  getLoans,
  getLoan,
  createLoan,
  updateLoanStatus,
  deleteLoan,
};