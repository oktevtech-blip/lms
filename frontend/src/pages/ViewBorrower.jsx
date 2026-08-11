// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaUser,
//   FaPhone,
//   FaIdCard,
//   FaEnvelope,
//   FaMapMarkerAlt,
// } from "react-icons/fa";

// import { getBorrower } from "../services/borrowerService";

// const ViewBorrower = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [borrower, setBorrower] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadBorrower();
//   }, []);

//   const loadBorrower = async () => {
//     try {
//       const data = await getBorrower(id);
//       setBorrower(data);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load borrower.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-20 text-lg">
//         Loading borrower...
//       </div>
//     );
//   }

//   if (!borrower) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-2xl font-bold">
//           Borrower not found
//         </h2>

//         <button
//           onClick={() => navigate("/borrowers")}
//           className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg"
//         >
//           Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Header */}

//       <div className="flex items-center gap-3 mb-6">
//         <button
//           onClick={() => navigate("/borrowers")}
//           className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
//         >
//           <FaArrowLeft />
//           Back
//         </button>

//         <h1 className="text-3xl font-bold">
//           Borrower Details
//         </h1>
//       </div>

//       {/* Profile */}

//       <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

//         <div className="flex items-center gap-6">

//           <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
//             <FaUser className="text-4xl text-green-600" />
//           </div>

//           <div>
//             <h2 className="text-2xl font-bold">
//               {borrower.full_name}
//             </h2>

//             <p className="text-gray-500">
//               Borrower ID: {borrower.borrower_id}
//             </p>
//           </div>

//         </div>

//       </div>

//       {/* Information */}

//       <div className="grid md:grid-cols-2 gap-6 mb-6">

//         <div className="bg-white rounded-xl shadow-sm p-6">

//           <h3 className="font-semibold text-lg mb-5">
//             Personal Information
//           </h3>

//           <div className="space-y-5">

//             <div className="flex items-center gap-3">
//               <FaIdCard className="text-slate-500" />
//               <span>{borrower.national_id}</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <FaPhone className="text-slate-500" />
//               <span>{borrower.phone}</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <FaEnvelope className="text-slate-500" />
//               <span>{borrower.email || "No email"}</span>
//             </div>

//             <div className="flex items-start gap-3">
//               <FaMapMarkerAlt className="text-slate-500 mt-1" />
//               <span>{borrower.address}</span>
//             </div>

//           </div>

//         </div>

//         {/* Loan Summary */}

//         <div className="bg-white rounded-xl shadow-sm p-6">

//           <h3 className="font-semibold text-lg mb-5">
//             Loan Summary
//           </h3>

//           <div className="space-y-4">

//             <div>
//               <p className="text-gray-500 text-sm">
//                 Active Loans
//               </p>

//               <p className="text-2xl font-bold">
//                 Coming Soon
//               </p>
//             </div>

//             <div>
//               <p className="text-gray-500 text-sm">
//                 Total Borrowed
//               </p>

//               <p className="text-2xl font-bold">
//                 UGX 0
//               </p>
//             </div>

//             <div>
//               <p className="text-gray-500 text-sm">
//                 Outstanding Balance
//               </p>

//               <p className="text-2xl font-bold text-red-600">
//                 UGX 0
//               </p>
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* Loans */}

//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">

//         <div className="p-6 border-b">
//           <h3 className="font-semibold text-lg">
//             Loans
//           </h3>
//         </div>

//         <table className="w-full">

//           <thead className="bg-slate-100">
//             <tr>
//               <th className="text-left px-6 py-4">
//                 Loan No
//               </th>

//               <th className="text-left px-6 py-4">
//                 Amount
//               </th>

//               <th className="text-left px-6 py-4">
//                 Balance
//               </th>

//               <th className="text-left px-6 py-4">
//                 Status
//               </th>
//             </tr>
//           </thead>

//           <tbody>

//             <tr>
//               <td
//                 colSpan="4"
//                 className="text-center py-12 text-gray-500"
//               >
//                 Loan information will appear here after we connect the Loans module.
//               </td>
//             </tr>

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default ViewBorrower;

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaIdCard,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

import { getBorrower } from "../services/borrowerService";

const ViewBorrower = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [borrower, setBorrower] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBorrower();
  }, [id]);

  const loadBorrower = async () => {
    try {
      setLoading(true);

      const data = await getBorrower(id);

      /*
        New backend response:

        {
          borrower: {...},
          loans: [...]
        }
      */

      setBorrower(data.borrower || null);
      setLoans(Array.isArray(data.loans) ? data.loans : []);

    } catch (error) {
      console.error("Failed to load borrower:", error);

      alert(error.message || "Failed to load borrower.");

      setBorrower(null);
      setLoans([]);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Loading
  // =============================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-500">
            Loading borrower...
          </p>
        </div>
      </div>
    );
  }

  // =============================
  // Borrower Not Found
  // =============================

  if (!borrower) {
    return (
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md w-full">

          <div className="text-5xl mb-4">
            👤
          </div>

          <h2 className="text-xl font-bold">
            Borrower Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            The borrower you are looking for could not be found.
          </p>

          <button
            onClick={() => navigate("/borrowers")}
            className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Back to Borrowers
          </button>

        </div>
      </div>
    );
  }

  // =============================
  // Loan Calculations
  // =============================

  const activeLoans = loans.filter(
    (loan) => loan.status === "Active"
  ).length;

  const totalBorrowed = loans.reduce(
    (total, loan) =>
      total + Number(loan.principal_amount || 0),
    0
  );

  const outstandingBalance = loans.reduce(
    (total, loan) =>
      total + Number(loan.balance || 0),
    0
  );

  const totalPaid = loans.reduce(
    (total, loan) =>
      total + Number(loan.amount_paid || 0),
    0
  );

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString();
  };

  // =============================
  // Page
  // =============================

  return (
    <div className="w-full max-w-7xl mx-auto">

      {/* =============================
          Header
      ============================= */}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">

        <button
          onClick={() => navigate("/borrowers")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 w-fit"
        >
          <FaArrowLeft />
          Back
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold">
          Borrower Details
        </h1>

      </div>

      {/* =============================
          Profile
      ============================= */}

      <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 mb-6">

        <div className="flex flex-col sm:flex-row sm:items-center gap-5">

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">

            <FaUser className="text-3xl sm:text-4xl text-green-600" />

          </div>

          <div className="min-w-0">

            <h2 className="text-xl sm:text-2xl font-bold break-words">
              {borrower.full_name}
            </h2>

            <p className="text-gray-500 mt-1">
              Borrower ID: {borrower.borrower_id}
            </p>

          </div>

        </div>

      </div>

      {/* =============================
          Information Cards
      ============================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Personal Information */}

        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">

          <h3 className="font-semibold text-lg mb-5">
            Personal Information
          </h3>

          <div className="space-y-5">

            <div className="flex items-start gap-3">

              <FaIdCard className="text-slate-500 mt-1 flex-shrink-0" />

              <div className="min-w-0">

                <p className="text-xs text-gray-400 mb-1">
                  National ID
                </p>

                <p className="break-words">
                  {borrower.national_id || "Not provided"}
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3">

              <FaPhone className="text-slate-500 mt-1 flex-shrink-0" />

              <div className="min-w-0">

                <p className="text-xs text-gray-400 mb-1">
                  Phone
                </p>

                <p className="break-words">
                  {borrower.phone || "Not provided"}
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3">

              <FaEnvelope className="text-slate-500 mt-1 flex-shrink-0" />

              <div className="min-w-0">

                <p className="text-xs text-gray-400 mb-1">
                  Email
                </p>

                <p className="break-words">
                  {borrower.email || "No email"}
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3">

              <FaMapMarkerAlt className="text-slate-500 mt-1 flex-shrink-0" />

              <div className="min-w-0">

                <p className="text-xs text-gray-400 mb-1">
                  Address
                </p>

                <p className="break-words">
                  {borrower.address || "Not provided"}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Loan Summary */}

        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">

          <div className="flex items-center gap-2 mb-5">

            <FaMoneyBillWave className="text-green-600" />

            <h3 className="font-semibold text-lg">
              Loan Summary
            </h3>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Active Loans */}

            <div className="bg-green-50 rounded-lg p-4">

              <p className="text-gray-500 text-sm">
                Active Loans
              </p>

              <p className="text-2xl font-bold text-green-700 mt-1">
                {activeLoans}
              </p>

            </div>

            {/* Total Borrowed */}

            <div className="bg-blue-50 rounded-lg p-4">

              <p className="text-gray-500 text-sm">
                Total Borrowed
              </p>

              <p className="text-xl sm:text-2xl font-bold text-blue-700 mt-1 break-words">
                UGX {formatMoney(totalBorrowed)}
              </p>

            </div>

            {/* Amount Paid */}

            <div className="bg-purple-50 rounded-lg p-4">

              <p className="text-gray-500 text-sm">
                Total Paid
              </p>

              <p className="text-xl sm:text-2xl font-bold text-purple-700 mt-1 break-words">
                UGX {formatMoney(totalPaid)}
              </p>

            </div>

            {/* Outstanding */}

            <div className="bg-red-50 rounded-lg p-4">

              <p className="text-gray-500 text-sm">
                Outstanding Balance
              </p>

              <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1 break-words">
                UGX {formatMoney(outstandingBalance)}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =============================
          Loans
      ============================= */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="p-5 sm:p-6 border-b">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>

              <h3 className="font-semibold text-lg">
                Loans
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {loans.length} loan{loans.length !== 1 ? "s" : ""}
                {" "}associated with this borrower
              </p>

            </div>

            <Link
              to="/loans/create"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm text-center"
            >
              Create Loan
            </Link>

          </div>

        </div>

        {loans.length > 0 ? (

          /*
            Horizontal scrolling is only applied to the table.
            This prevents the entire page from becoming too wide
            on phones.
          */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead className="bg-slate-100">

                <tr>

                  <th className="text-left px-5 py-4">
                    Loan
                  </th>

                  <th className="text-left px-5 py-4">
                    Principal
                  </th>

                  <th className="text-left px-5 py-4">
                    Interest
                  </th>

                  <th className="text-left px-5 py-4">
                    Duration
                  </th>

                  <th className="text-left px-5 py-4">
                    Total
                  </th>

                  <th className="text-left px-5 py-4">
                    Paid
                  </th>

                  <th className="text-left px-5 py-4">
                    Balance
                  </th>

                  <th className="text-left px-5 py-4">
                    Due Date
                  </th>

                  <th className="text-left px-5 py-4">
                    Status
                  </th>

                  <th className="text-center px-5 py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {loans.map((loan) => (

                  <tr
                    key={loan.loan_id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-5 py-4 font-medium">
                      #{loan.loan_id}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      UGX {formatMoney(loan.principal_amount)}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {loan.interest_rate}%
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">

                      {loan.duration_value}{" "}

                      {loan.duration_unit}

                    </td>

                    <td className="px-5 py-4 font-medium whitespace-nowrap">
                      UGX {formatMoney(loan.total_amount)}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      UGX {formatMoney(loan.amount_paid)}
                    </td>

                    <td className="px-5 py-4 text-red-600 font-semibold whitespace-nowrap">
                      UGX {formatMoney(loan.balance)}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">

                      <div className="flex items-center gap-2">

                        <FaCalendarAlt className="text-gray-400" />

                        {loan.due_date
                          ? new Date(
                              loan.due_date
                            ).toLocaleDateString()
                          : "N/A"}

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
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

                    <td className="px-5 py-4 text-center">

                      <Link
                        to={`/loans/view/${loan.loan_id}`}
                        className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm"
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="text-center py-12 px-6">

            <div className="text-5xl mb-4">
              💰
            </div>

            <h3 className="text-lg font-semibold">
              No Loans Found
            </h3>

            <p className="text-gray-500 mt-1">
              This borrower does not have any loans yet.
            </p>

            <Link
              to="/loans/create"
              className="inline-block mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Create Loan
            </Link>

          </div>

        )}

      </div>

    </div>
  );
};

export default ViewBorrower;