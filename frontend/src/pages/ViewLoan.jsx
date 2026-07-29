import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaUser, FaPlus } from "react-icons/fa";

import { getLoan } from "../services/loanService";

const ViewLoan = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLoan();
  }, []);

  const loadLoan = async () => {
    try {
      const data = await getLoan(id);

      // Works whether backend returns {loan: {...}} or just {...}
      setLoan(data.loan || data);
    } catch (error) {
      console.error(error);
      alert("Failed to load loan.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading loan...
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="text-center py-20 text-xl">
        Loan not found.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate("/loans")}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-100"
          >
            <FaArrowLeft />
            Back
          </button>

          <h1 className="text-3xl font-bold">
            Loan Details
          </h1>

        </div>

        <button
          onClick={() =>
            navigate(`/payments/create?loan=${loan.loan_id}`)
          }
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
        >
          <FaPlus />
          Record Payment
        </button>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500">Principal</p>

          <h2 className="text-2xl font-bold">
            UGX {Number(loan.principal_amount || 0).toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500">Interest Rate</p>

          <h2 className="text-2xl font-bold">
            {loan.interest_rate}%
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500">Interest Amount</p>

          <h2 className="text-2xl font-bold">
            UGX {Number(loan.interest_amount || 0).toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500">Balance</p>

          <h2 className="text-2xl font-bold text-red-600">
            UGX {Number(loan.balance || 0).toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Borrower & Loan */}

      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow-sm p-6">

          <h3 className="font-semibold text-lg mb-4">
            Borrower
          </h3>

          <div className="flex items-center gap-3">

            <FaUser className="text-green-600 text-xl" />

            <div>

              <h4 className="font-semibold">
                {loan.full_name}
              </h4>

              <p className="text-gray-500">
                Borrower
              </p>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">

          <h3 className="font-semibold text-lg mb-4">
            Loan Information
          </h3>

          <div className="space-y-2">

            <p>
              <strong>Loan ID:</strong> #{loan.loan_id}
            </p>

            <p>
              <strong>Loan Date:</strong> {loan.loan_date}
            </p>

            <p>
              <strong>Due Date:</strong> {loan.due_date}
            </p>

            <p>
              <strong>Total Amount:</strong>{" "}
              UGX {Number(loan.total_amount || 0).toLocaleString()}
            </p>

            <p>
              <strong>Amount Paid:</strong>{" "}
              UGX {Number(loan.amount_paid || 0).toLocaleString()}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  loan.status === "Completed"
                    ? "text-blue-600"
                    : loan.status === "Overdue"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {loan.status}
              </span>
            </p>

          </div>

        </div>

      </div>

      {/* Payment History Placeholder */}

      <div className="bg-white rounded-xl shadow-sm">

        <div className="p-6 border-b">

          <h3 className="text-lg font-semibold">
            Payment History
          </h3>

        </div>

        <div className="py-12 text-center text-gray-500">
          Payment history will appear here after payments are recorded.
        </div>

      </div>

    </div>
  );
};

export default ViewLoan;