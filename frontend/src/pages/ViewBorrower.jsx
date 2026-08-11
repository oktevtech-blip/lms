import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaIdCard,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { getBorrower } from "../services/borrowerService";

const ViewBorrower = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [borrower, setBorrower] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBorrower();
  }, []);

  const loadBorrower = async () => {
    try {
      const data = await getBorrower(id);
      setBorrower(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load borrower.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading borrower...
      </div>
    );
  }

  if (!borrower) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          Borrower not found
        </h2>

        <button
          onClick={() => navigate("/borrowers")}
          className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/borrowers")}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          <FaArrowLeft />
          Back
        </button>

        <h1 className="text-3xl font-bold">
          Borrower Details
        </h1>
      </div>

      {/* Profile */}

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <FaUser className="text-4xl text-green-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {borrower.full_name}
            </h2>

            <p className="text-gray-500">
              Borrower ID: {borrower.borrower_id}
            </p>
          </div>

        </div>

      </div>

      {/* Information */}

      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow-sm p-6">

          <h3 className="font-semibold text-lg mb-5">
            Personal Information
          </h3>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <FaIdCard className="text-slate-500" />
              <span>{borrower.national_id}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-slate-500" />
              <span>{borrower.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-slate-500" />
              <span>{borrower.email || "No email"}</span>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-slate-500 mt-1" />
              <span>{borrower.address}</span>
            </div>

          </div>

        </div>

        {/* Loan Summary */}

        <div className="bg-white rounded-xl shadow-sm p-6">

          <h3 className="font-semibold text-lg mb-5">
            Loan Summary
          </h3>

          <div className="space-y-4">

            <div>
              <p className="text-gray-500 text-sm">
                Active Loans
              </p>

              <p className="text-2xl font-bold">
                Coming Soon
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Total Borrowed
              </p>

              <p className="text-2xl font-bold">
                UGX 0
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Outstanding Balance
              </p>

              <p className="text-2xl font-bold text-red-600">
                UGX 0
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Loans */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="p-6 border-b">
          <h3 className="font-semibold text-lg">
            Loans
          </h3>
        </div>

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-4">
                Loan No
              </th>

              <th className="text-left px-6 py-4">
                Amount
              </th>

              <th className="text-left px-6 py-4">
                Balance
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td
                colSpan="4"
                className="text-center py-12 text-gray-500"
              >
                Loan information will appear here after we connect the Loans module.
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ViewBorrower;