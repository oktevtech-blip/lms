const db = require("../config/db");

// ===============================
// Get All Payments
// ===============================
const getPayments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        p.payment_id,
        p.loan_id,
        p.amount_paid,
        p.payment_date,
        b.full_name,
        l.monthly_installment,
        l.total_amount,
        l.balance
      FROM payments p
      JOIN loans l
        ON p.loan_id = l.loan_id
      JOIN borrowers b
        ON l.borrower_id = b.borrower_id
      ORDER BY p.payment_date DESC,
               p.payment_id DESC
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Record Monthly Payment
// ===============================
const recordPayment = async (req, res) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const {
      loan_id,
      amount_paid,
      payment_date,
    } = req.body;

    // ===============================
    // Get Loan
    // ===============================
    const [loanRows] = await connection.query(
      `
      SELECT *
      FROM loans
      WHERE loan_id = ?
      `,
      [loan_id]
    );

    if (!loanRows.length) {
      await connection.rollback();

      return res.status(404).json({
        message: "Loan not found.",
      });
    }

    const loan = loanRows[0];

    if (loan.status === "Completed") {
      await connection.rollback();

      return res.status(400).json({
        message: "This loan has already been completed.",
      });
    }

    // ===============================
    // Get Next Pending Installment
    // ===============================
    const [scheduleRows] = await connection.query(
      `
      SELECT *
      FROM loan_schedule
      WHERE loan_id = ?
      AND status='Pending'
      ORDER BY installment_no
      LIMIT 1
      `,
      [loan_id]
    );

    if (!scheduleRows.length) {
      await connection.rollback();

      return res.status(400).json({
        message: "No pending installments remaining.",
      });
    }

    const installment = scheduleRows[0];

    const expectedAmount = Number(installment.amount_due);
    const receivedAmount = Number(amount_paid);

    // ===============================
    // Strict Monthly Payment
    // ===============================
    if (receivedAmount !== expectedAmount) {
      await connection.rollback();

      return res.status(400).json({
        message: `The required monthly installment is UGX ${expectedAmount.toLocaleString()}.`,
      });
    }

    // ===============================
    // Save Payment
    // ===============================
    await connection.query(
      `
      INSERT INTO payments
      (
        loan_id,
        amount_paid,
        payment_date
      )
      VALUES (?, ?, ?)
      `,
      [
        loan_id,
        receivedAmount,
        payment_date,
      ]
    );

    // ===============================
    // Update Schedule
    // ===============================
    await connection.query(
      `
      UPDATE loan_schedule
      SET
        amount_paid = ?,
        status = 'Paid'
      WHERE schedule_id = ?
      `,
      [
        receivedAmount,
        installment.schedule_id,
      ]
    );

    // ===============================
    // Update Loan
    // ===============================
    const newAmountPaid =
      Number(loan.amount_paid) +
      receivedAmount;

    const newBalance =
      Number(loan.total_amount) -
      newAmountPaid;

    const status =
      newBalance <= 0
        ? "Completed"
        : "Active";

    await connection.query(
      `
      UPDATE loans
      SET
        amount_paid = ?,
        balance = ?,
        status = ?
      WHERE loan_id = ?
      `,
      [
        newAmountPaid,
        Math.max(newBalance, 0),
        status,
        loan_id,
      ]
    );

    // ===============================
    // Remaining Installments
    // ===============================
    const [remaining] = await connection.query(
      `
      SELECT COUNT(*) AS remaining
      FROM loan_schedule
      WHERE loan_id = ?
      AND status='Pending'
      `,
      [loan_id]
    );

    const [nextInstallment] = await connection.query(
      `
      SELECT *
      FROM loan_schedule
      WHERE loan_id = ?
      AND status='Pending'
      ORDER BY installment_no
      LIMIT 1
      `,
      [loan_id]
    );

    await connection.commit();

    res.json({
      message: "Payment recorded successfully.",
      balance: Math.max(newBalance, 0),
      totalPaid: newAmountPaid,
      loanStatus: status,
      remainingInstallments: remaining[0].remaining,
      nextInstallment:
        nextInstallment.length > 0
          ? {
              installment_no:
                nextInstallment[0].installment_no,
              due_date:
                nextInstallment[0].due_date,
              amount_due:
                nextInstallment[0].amount_due,
            }
          : null,
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
  getPayments,
  recordPayment,
};