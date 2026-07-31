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
            WHEN status = 'Overdue' THEN 1
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
        YEAR(loan_date) AS yr,
        MONTH(loan_date) AS mn,
        DATE_FORMAT(MIN(loan_date), '%b') AS month,
        SUM(total_amount) AS amount
      FROM loans
      GROUP BY
        YEAR(loan_date),
        MONTH(loan_date)
      ORDER BY
        yr,
        mn
    `);

    // ===========================
    // Monthly Collections
    // ===========================
    const [collectionTrend] = await db.query(`
      SELECT
        YEAR(payment_date) AS yr,
        MONTH(payment_date) AS mn,
        DATE_FORMAT(MIN(payment_date), '%b') AS month,
        SUM(amount_paid) AS amount
      FROM payments
      GROUP BY
        YEAR(payment_date),
        MONTH(payment_date)
      ORDER BY
        yr,
        mn
    `);

    // ===========================
    // Top Borrowers
    // ===========================
    const [topBorrowers] = await db.query(`
      SELECT
        b.borrower_id,
        b.full_name,
        SUM(l.principal_amount) AS amount
      FROM borrowers b
      INNER JOIN loans l
        ON b.borrower_id = l.borrower_id
      GROUP BY
        b.borrower_id,
        b.full_name
      ORDER BY
        amount DESC
      LIMIT 10
    `);

    res.status(200).json({
      summary,
      loanTrend,
      collectionTrend,
      topBorrowers,
    });
  } catch (error) {
    console.error("===== REPORT ERROR =====");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      sql: error.sql || null,
    });
  }
};

module.exports = {
  getReports,
};