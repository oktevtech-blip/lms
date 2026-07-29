const db = require("../config/db");

const getDashboard = async (req, res) => {
  try {
    // Statistics

    const [[borrowers]] = await db.query(`
      SELECT COUNT(*) AS totalBorrowers
      FROM borrowers
    `);

    const [[activeLoans]] = await db.query(`
      SELECT COUNT(*) AS activeLoans
      FROM loans
      WHERE status='Active'
    `);

    const [[completedLoans]] = await db.query(`
      SELECT COUNT(*) AS completedLoans
      FROM loans
      WHERE status='Completed'
    `);

    const [[overdueLoans]] = await db.query(`
      SELECT COUNT(*) AS overdueLoans
      FROM loans
      WHERE status='Overdue'
    `);

    const [[loanCount]] = await db.query(`
      SELECT COUNT(*) AS totalLoans
      FROM loans
    `);

    const [[balance]] = await db.query(`
      SELECT IFNULL(SUM(balance),0) AS outstandingBalance
      FROM loans
      WHERE status='Active'
    `);

    const [[collected]] = await db.query(`
      SELECT IFNULL(SUM(amount_paid),0) AS totalCollected
      FROM payments
    `);

    // Recent Loans

    const [recentLoans] = await db.query(`
      SELECT
        l.loan_id,
        l.principal_amount,
        b.full_name
      FROM loans l
      JOIN borrowers b
        ON l.borrower_id=b.borrower_id
      ORDER BY l.loan_id DESC
      LIMIT 5
    `);

    // Recent Payments

    const [recentPayments] = await db.query(`
      SELECT
        p.payment_id,
        p.amount_paid,
        b.full_name
      FROM payments p
      JOIN loans l
        ON p.loan_id=l.loan_id
      JOIN borrowers b
        ON l.borrower_id=b.borrower_id
      ORDER BY p.payment_id DESC
      LIMIT 5
    `);

    res.json({
      stats: {
        totalBorrowers: borrowers.totalBorrowers,
        activeLoans: activeLoans.activeLoans,
        completedLoans: completedLoans.completedLoans,
        overdueLoans: overdueLoans.overdueLoans,
        totalLoans: loanCount.totalLoans,
        outstandingBalance: balance.outstandingBalance,
        totalCollected: collected.totalCollected,
      },
      recentLoans,
      recentPayments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};