import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { getBorrowers } from "../services/borrowerService";
import { createLoan } from "../services/loanService";

const CreateLoan = () => {
  const navigate = useNavigate();

  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    borrower_id: "",
    principal_amount: "",
    interest_rate: "",
    duration_value: "",
    duration_unit: "Months",
    loan_date: "",
    due_date: "",
  });

  useEffect(() => {
    loadBorrowers();
  }, []);

  const loadBorrowers = async () => {
    try {
      const data = await getBorrowers();

      if (Array.isArray(data)) {
        setBorrowers(data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load borrowers.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const principal =
    Number(formData.principal_amount) || 0;

  const rate =
    Number(formData.interest_rate) || 0;

  const duration =
    Number(formData.duration_value) || 0;

  const interestAmount =
    (principal * rate) / 100;

  const totalAmount =
    principal + interestAmount;

  const installment =
    duration > 0
      ? totalAmount / duration
      : 0;

  const balance = totalAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createLoan({
        borrower_id: Number(formData.borrower_id),
        principal_amount: principal,
        interest_rate: rate,
        duration_value: duration,
        duration_unit: formData.duration_unit,
        loan_date: formData.loan_date,
        due_date: formData.due_date,
      });

      alert("Loan created successfully.");

      navigate("/loans");

    } catch (err) {

      console.error(err);

      alert(err.message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="max-w-4xl">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <button
          onClick={() => navigate("/loans")}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          <FaArrowLeft />
          Back
        </button>

        <h1 className="text-3xl font-bold">
          Create Loan
        </h1>

      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Borrower */}

          <div>

            <label className="block mb-2 font-medium">
              Borrower
            </label>

            <select
              name="borrower_id"
              value={formData.borrower_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">
                Select Borrower
              </option>

              {borrowers.map((borrower) => (

                <option
                  key={borrower.borrower_id}
                  value={borrower.borrower_id}
                >
                  {borrower.full_name}
                </option>

              ))}

            </select>

          </div>

          {/* Principal */}

          <div>

            <label className="block mb-2 font-medium">
              Principal Amount
            </label>

            <input
              type="number"
              name="principal_amount"
              value={formData.principal_amount}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter principal amount"
              required
            />

          </div>

          {/* Interest */}

          <div>

            <label className="block mb-2 font-medium">
              Interest Rate (%)
            </label>

            <input
              type="number"
              name="interest_rate"
              value={formData.interest_rate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter interest rate"
              required
            />

          </div>

          {/* Duration */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="block mb-2 font-medium">
                Duration
              </label>

              <input
                type="number"
                name="duration_value"
                value={formData.duration_value}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Example: 12"
                min="1"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Duration Unit
              </label>

              <select
                name="duration_unit"
                value={formData.duration_unit}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="Days">
                  Days
                </option>

                <option value="Weeks">
                  Weeks
                </option>

                <option value="Months">
                  Months
                </option>

                <option value="Years">
                  Years
                </option>

              </select>

            </div>

          </div>

          {/* Loan Date */}

          <div>

            <label className="block mb-2 font-medium">
              Loan Date
            </label>

            <input
              type="date"
              name="loan_date"
              value={formData.loan_date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

          </div>

          {/* Due Date */}

          <div>

            <label className="block mb-2 font-medium">
              Due Date
            </label>

            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

          </div>

          {/* Loan Summary */}

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">

            <h3 className="text-lg font-semibold mb-5">
              Loan Summary
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Principal</span>
                <strong>
                  UGX {principal.toLocaleString()}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Interest Rate</span>
                <strong>{rate}%</strong>
              </div>

              <div className="flex justify-between">
                <span>Interest Amount</span>
                <strong>
                  UGX {interestAmount.toLocaleString()}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Total Payable</span>
                <strong>
                  UGX {totalAmount.toLocaleString()}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Duration</span>
                <strong>
                  {duration} {formData.duration_unit}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Installment Amount</span>
                <strong className="text-blue-600">
                  UGX {installment.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>

              <div className="flex justify-between text-lg border-t pt-4">

                <span className="font-semibold">
                  Opening Balance
                </span>

                <strong className="text-red-600">
                  UGX {balance.toLocaleString()}
                </strong>

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex gap-3">

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg"
            >
              {loading ? "Creating..." : "Create Loan"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/loans")}
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

export default CreateLoan;