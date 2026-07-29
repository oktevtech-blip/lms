import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEye,
  FaTrash,
} from "react-icons/fa";

import {
  getLoans,
  deleteLoan,
} from "../services/loanService";

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      const data = await getLoans();

      if (Array.isArray(data)) {
        setLoans(data);
      } else {
        setLoans([]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load loans.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this loan?")) return;

    try {
      await deleteLoan(id);

      alert("Loan deleted successfully.");

      loadLoans();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const filteredLoans = loans.filter((loan) => {
    const term = search.toLowerCase();

    return (
      loan.full_name?.toLowerCase().includes(term) ||
      loan.duration_unit?.toLowerCase().includes(term) ||
      loan.status?.toLowerCase().includes(term)
    );
  });

  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Loans
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all loans
          </p>

        </div>

        <Link
          to="/loans/create"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg"
        >
          <FaPlus />
          Create Loan
        </Link>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">

        <div className="flex justify-between items-center">

          <input
            type="text"
            placeholder="Search loan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-3 w-80"
          />

          <div className="text-sm text-gray-500">
            Total Loans: <strong>{filteredLoans.length}</strong>
          </div>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left px-6 py-4">
                Borrower
              </th>

              <th className="text-left px-6 py-4">
                Duration Unit
              </th>

              <th className="text-left px-6 py-4">
                Principal
              </th>

              <th className="text-left px-6 py-4">
                Interest
              </th>

              <th className="text-left px-6 py-4">
                Total
              </th>

              <th className="text-left px-6 py-4">
                Balance
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-center px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredLoans.length > 0 ? (

              filteredLoans.map((loan) => (

                <tr
                  key={loan.loan_id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-4 font-medium">
                    {loan.full_name}
                  </td>

                  <td className="px-6 py-4">

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      {loan.duration_unit}
                    </span>

                  </td>

                  <td className="px-6 py-4">
                    UGX {Number(
                      loan.principal_amount
                    ).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {loan.interest_rate}%
                  </td>

                  <td className="px-6 py-4 font-medium">
                    UGX {Number(
                      loan.total_amount
                    ).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-red-600 font-semibold">
                    UGX {Number(
                      loan.balance
                    ).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        loan.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : loan.status === "Overdue"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {loan.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <Link
                        to={`/loans/view/${loan.loan_id}`}
                        className="p-2 bg-blue-100 rounded-lg text-blue-600 hover:bg-blue-200"
                      >
                        <FaEye />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(loan.loan_id)
                        }
                        className="p-2 bg-red-100 rounded-lg text-red-600 hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-12"
                >

                  <div className="flex flex-col items-center">

                    <div className="text-5xl">
                      💰
                    </div>

                    <h3 className="text-lg font-semibold mt-3">
                      No Loans Found
                    </h3>

                    <p className="text-gray-500">
                      Create your first loan.
                    </p>

                    <Link
                      to="/loans/create"
                      className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg"
                    >
                      Create Loan
                    </Link>

                  </div>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Loans;