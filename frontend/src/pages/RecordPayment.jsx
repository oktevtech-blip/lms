import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { getLoans } from "../services/loanService";
import { createPayment } from "../services/paymentService";

const RecordPayment = () => {
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);

  const [formData, setFormData] = useState({
    loan_id: "",
    amount_paid: "",
    payment_date: new Date().toISOString().split("T")[0],
  });

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
    }
  };

  const selectedLoan = loans.find(
    (loan) => loan.loan_id === Number(formData.loan_id)
  );

  useEffect(() => {
    if (selectedLoan) {
      setFormData((prev) => ({
        ...prev,
        amount_paid: selectedLoan.monthly_installment,
      }));
    }
  }, [selectedLoan]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPayment({
        ...formData,
        amount_paid: Number(formData.amount_paid),
      });

      alert("Payment recorded successfully.");

      navigate("/payments");
    } catch (error) {
      console.error(error);
      alert("Failed to record payment.");
    }
  };

  return (
    <div className="max-w-3xl">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <button
          onClick={() => navigate("/payments")}
          className="bg-white border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
        >
          <FaArrowLeft />
          Back
        </button>

        <h1 className="text-3xl font-bold">
          Record Payment
        </h1>

      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Loan */}

          <div>

            <label className="block mb-2 font-medium">
              Loan
            </label>

            <select
              className="w-full border rounded-lg p-3"
              value={formData.loan_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  loan_id: e.target.value,
                })
              }
              required
            >

              <option value="">
                Select Loan
              </option>

              {loans
                .filter((loan) => loan.status === "Active")
                .map((loan) => (
                  <option
                    key={loan.loan_id}
                    value={loan.loan_id}
                  >
                    #{loan.loan_id} - {loan.full_name}
                  </option>
                ))}

            </select>

          </div>

          {selectedLoan && (

            <div className="bg-slate-50 border rounded-xl p-5 space-y-3">

              <h3 className="font-semibold text-lg">
                Loan Summary
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <p className="text-gray-500 text-sm">
                    Borrower
                  </p>

                  <p className="font-semibold">
                    {selectedLoan.full_name}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Monthly Installment
                  </p>

                  <p className="font-bold text-green-600 text-lg">
                    UGX {Number(selectedLoan.monthly_installment).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Total Payable
                  </p>

                  <p>
                    UGX {Number(selectedLoan.total_amount).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Amount Paid
                  </p>

                  <p>
                    UGX {Number(selectedLoan.amount_paid).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Remaining Balance
                  </p>

                  <p className="font-bold text-red-600">
                    UGX {Number(selectedLoan.balance).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Installments
                  </p>

                  <p>
                    {selectedLoan.installments_paid} of{" "}
                    {selectedLoan.number_of_installments}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Remaining Installments
                  </p>

                  <p className="font-semibold">
                    {selectedLoan.number_of_installments -
                      selectedLoan.installments_paid}
                  </p>
                </div>

              </div>

            </div>

          )}

          {/* Amount */}

          <div>

            <label className="block mb-2 font-medium">
              Payment Amount
            </label>

            <input
              type="number"
              className="w-full border rounded-lg p-3"
              value={formData.amount_paid}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount_paid: e.target.value,
                })
              }
              required
            />

            {selectedLoan && (
              <p className="text-sm text-gray-500 mt-2">
                Recommended payment:
                <strong className="ml-1 text-green-600">
                  UGX {Number(selectedLoan.monthly_installment).toLocaleString()}
                </strong>
              </p>
            )}

          </div>

          {/* Date */}

          <div>

            <label className="block mb-2 font-medium">
              Payment Date
            </label>

            <input
              type="date"
              className="w-full border rounded-lg p-3"
              value={formData.payment_date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payment_date: e.target.value,
                })
              }
            />

          </div>

          {/* Buttons */}

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Save Payment
            </button>

            <button
              type="button"
              onClick={() => navigate("/payments")}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default RecordPayment;