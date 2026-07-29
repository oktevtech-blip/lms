import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";

import { getPayments } from "../services/paymentService";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const data = await getPayments();

      if (Array.isArray(data)) {
        setPayments(data);
      } else {
        setPayments([]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const term = search.toLowerCase();

      return (
        payment.full_name?.toLowerCase().includes(term) ||
        String(payment.loan_id).includes(term) ||
        payment.payment_date?.includes(term)
      );
    });
  }, [payments, search]);

  const totalCollected = filteredPayments.reduce(
    (sum, payment) => sum + Number(payment.amount_paid),
    0
  );

  const today = new Date().toISOString().split("T")[0];

  const todayCollections = filteredPayments
    .filter((payment) => payment.payment_date === today)
    .reduce(
      (sum, payment) => sum + Number(payment.amount_paid),
      0
    );

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading payments...
      </div>
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Payments
          </h1>

          <p className="text-gray-500 mt-1">
            Track all loan repayments
          </p>

        </div>

        <Link
          to="/payments/create"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
        >
          <FaPlus />
          Record Payment
        </Link>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500 text-sm">
            Total Payments
          </p>

          <h2 className="text-3xl font-bold">
            {filteredPayments.length}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500 text-sm">
            Total Collected
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            UGX {totalCollected.toLocaleString()}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500 text-sm">
            Today's Collections
          </p>

          <h2 className="text-3xl font-bold text-blue-600">
            UGX {todayCollections.toLocaleString()}
          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">

        <div className="relative max-w-md">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search borrower, loan or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left px-6 py-4">
                Date
              </th>

              <th className="text-left px-6 py-4">
                Borrower
              </th>

              <th className="text-left px-6 py-4">
                Loan
              </th>

              <th className="text-right px-6 py-4">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPayments.length > 0 ? (

              filteredPayments.map((payment) => (

                <tr
                  key={payment.payment_id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-4">
                    {payment.payment_date}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {payment.full_name}
                  </td>

                  <td className="px-6 py-4">
                    #{payment.loan_id}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-green-600">
                    UGX {Number(payment.amount_paid).toLocaleString()}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-12"
                >

                  <div className="flex flex-col items-center">

                    <div className="text-5xl mb-3">
                      💵
                    </div>

                    <h3 className="text-lg font-semibold">
                      No Payments Found
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Record a payment to get started.
                    </p>

                    <Link
                      to="/payments/create"
                      className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                    >
                      Record Payment
                    </Link>

                  </div>

                </td>

              </tr>

            )}

          </tbody>

        </table>

        <div className="border-t px-6 py-4">

          <p className="text-sm text-gray-500">
            Showing {filteredPayments.length} payment(s)
          </p>

        </div>

      </div>

    </div>
  );
};

export default Payments;