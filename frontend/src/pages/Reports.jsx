import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";

import {
  useEffect,
  useState,
  useRef,
} from "react";

import { useReactToPrint } from "react-to-print";
import { getReports } from "../services/reportService";

const Reports = () => {
  const [report, setReport] = useState(null);
  const reportRef = useRef(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await getReports();
      setReport(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load reports.");
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: "Loan Report",
  });

  const formatCurrency = (value) => {
    const number = Number(value) || 0;
    return `UGX ${number.toLocaleString()}`;
  };

  const formatYAxis = (value) => {
    const number = Number(value) || 0;

    if (number >= 1000000000) return `${(number / 1000000000).toFixed(1)}B`;
    if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
    if (number >= 1000) return `${(number / 1000).toFixed(0)}K`;

    return number;
  };

  if (!report) {
    return (
      <div className="flex justify-center items-center h-96 text-xl font-semibold">
        Loading reports...
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">
            Financial overview of your loan portfolio
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
        >
          Export PDF
        </button>
      </div>

      <div ref={reportRef} className="bg-white p-2">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500">Total Loans</p>
            <h2 className="text-3xl font-bold mt-2">
              {formatCurrency(report.summary.totalLoans)}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500">Total Collected</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {formatCurrency(report.summary.totalCollected)}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500">Outstanding Balance</p>
            <h2 className="text-3xl font-bold text-red-600 mt-2">
              {formatCurrency(report.summary.outstanding)}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500">Overdue Loans</p>
            <h2 className="text-3xl font-bold mt-2">
              {report.summary.overdueLoans || 0}
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-5">
              Loan Disbursement Trend
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={report.loanTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatYAxis} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar
                    dataKey="amount"
                    fill="#16a34a"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-5">
              Collection Trend
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={report.collectionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatYAxis} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Top Borrowers</h2>
          </div>

          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-6 py-4">Borrower</th>
                <th className="text-right px-6 py-4">Total Borrowed</th>
              </tr>
            </thead>

            <tbody>
              {report.topBorrowers.length > 0 ? (
                report.topBorrowers.map((borrower) => (
                  <tr
                    key={borrower.borrower_id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">{borrower.full_name}</td>
                    <td className="px-6 py-4 text-right font-semibold">
                      {formatCurrency(borrower.amount)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center py-12 text-gray-500"
                  >
                    No borrower data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
