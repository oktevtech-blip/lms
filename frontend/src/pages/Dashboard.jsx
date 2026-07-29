import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getDashboard } from "../services/dashboardService";

const Dashboard = () => {
  const [data, setData] = useState({
    stats: {},
    recentLoans: [],
    recentPayments: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const result = await getDashboard();
      setData(result);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of your loan portfolio
        </p>
      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        <StatCard
          title="Total Borrowers"
          value={data.stats.totalBorrowers}
        />

        <StatCard
          title="Active Loans"
          value={data.stats.activeLoans}
        />

        <StatCard
          title="Outstanding Balance"
          value={`UGX ${Number(
            data.stats.outstandingBalance || 0
          ).toLocaleString()}`}
        />

        <StatCard
          title="Total Collected"
          value={`UGX ${Number(
            data.stats.totalCollected || 0
          ).toLocaleString()}`}
        />

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500 text-sm">
            Loans Issued
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {data.stats.totalLoans}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500 text-sm">
            Completed Loans
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {data.stats.completedLoans}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500 text-sm">
            Overdue Loans
          </p>

          <h2 className="text-3xl font-bold mt-2 text-red-600">
            {data.stats.overdueLoans}
          </h2>

        </div>

      </div>

      {/* Recent Tables */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Loans */}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <div className="px-6 py-4 border-b">

            <h2 className="font-semibold text-lg">
              Recent Loans
            </h2>

          </div>

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left px-6 py-3">
                  Loan ID
                </th>

                <th className="text-left px-6 py-3">
                  Borrower
                </th>

                <th className="text-right px-6 py-3">
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {data.recentLoans.map((loan) => (

                <tr
                  key={loan.loan_id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-4">
                    #{loan.loan_id}
                  </td>

                  <td className="px-6 py-4">
                    {loan.full_name}
                  </td>

                  <td className="px-6 py-4 text-right font-medium">
                    UGX {Number(
                      loan.principal_amount
                    ).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Recent Payments */}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <div className="px-6 py-4 border-b">

            <h2 className="font-semibold text-lg">
              Recent Payments
            </h2>

          </div>

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left px-6 py-3">
                  Borrower
                </th>

                <th className="text-right px-6 py-3">
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {data.recentPayments.map((payment) => (

                <tr
                  key={payment.payment_id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-4">
                    {payment.full_name}
                  </td>

                  <td className="px-6 py-4 text-right font-medium text-green-600">
                    UGX {Number(
                      payment.amount_paid
                    ).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;