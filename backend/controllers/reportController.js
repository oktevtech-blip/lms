const db = require("../config/db");

const getReports = async (req, res) => {
  try {
    // ===========================
    // Summary
    // ===========================
    const [[summary]] = await db.query(`
      SELECT
        IFNULL(SUM(total_amount), 0) AS totalLoans,
        IFNULL(SUM(amount_paid), 0) AS totalCollected,
        IFNULL(SUM(balance), 0) AS outstanding,
        SUM(
          CASE
            WHEN status = 'Overdue'
            THEN 1
            ELSE 0
          END
        ) AS overdueLoans
      FROM loans
    `);

    // ===========================
    // Monthly Loan Disbursement
    // ===========================
    const [loanTrend] = await db.query(`
      SELECT
        DATE_FORMAT(loan_date, '%b') AS month,
        SUM(total_amount) AS amount
      FROM loans
      GROUP BY
        YEAR(loan_date),
        MONTH(loan_date)
      ORDER BY
        YEAR(loan_date),
        MONTH(loan_date)
    `);

    // ===========================
    // Monthly Collections
    // ===========================
    const [collectionTrend] = await db.query(`
      SELECT
        DATE_FORMAT(payment_date, '%b') AS month,
        SUM(amount_paid) AS amount
      FROM payments
      GROUP BY
        YEAR(payment_date),
        MONTH(payment_date)
      ORDER BY
        YEAR(payment_date),
        MONTH(payment_date)
    `);

    // ===========================
    // Top Borrowers
    // (Principal Borrowed Only)
    // ===========================
    const [topBorrowers] = await db.query(`
      SELECT
        b.borrower_id,
        b.full_name,
        IFNULL(SUM(l.principal_amount), 0) AS amount
      FROM borrowers b
      JOIN loans l
        ON b.borrower_id = l.borrower_id
      GROUP BY
        b.borrower_id,
        b.full_name
      ORDER BY amount DESC
      LIMIT 10
    `);

    res.json({
      summary,
      loanTrend,
      collectionTrend,
      topBorrowers,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getReports,
};