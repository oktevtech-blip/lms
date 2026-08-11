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
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaIdCard,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import { getBorrower } from "../services/borrowerService";

const ViewBorrower = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [borrower, setBorrower] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBorrower();
  }, [id]);

  const loadBorrower = async () => {
    try {
      setLoading(true);

      const data = await getBorrower(id);

      setBorrower(data.borrower);
      setSummary(data.summary);
      setLoans(
        Array.isArray(data.loans)
          ? data.loans
          : []
      );
    } catch (error) {
      console.error(error);
      alert(
        error.message || "Failed to load borrower."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `UGX ${Number(amount || 0).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-blue-100 text-blue-700";

      case "Overdue":
        return "bg-red-100 text-red-700";

      case "Active":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-gray-500">
          Loading borrower...
        </div>
      </div>
    );
  }

  if (!borrower) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <h2 className="text-xl font-semibold">
          Borrower not found
        </h2>

        <button
          onClick={() => navigate("/borrowers")}
          className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl">

      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">

        <button
          onClick={() => navigate("/borrowers")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 w-full sm:w-auto"
        >
          <FaArrowLeft />
          Back
        </button>

        <h1 className="text-2xl md:text-3xl font-bold">
          Borrower Details
        </h1>

      </div>

      {/* ================================= */}
      {/* Profile */}
      {/* ================================= */}

      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">

          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-100 flex items-center justify-center shrink-0">

            <FaUser className="text-3xl md:text-4xl text-green-600" />

          </div>

          <div className="min-w-0">

            <h2 className="text-xl md:text-2xl font-bold break-words">
              {borrower.full_name}
            </h2>

            <p className="text-gray-500">
              Borrower ID: {borrower.borrower_id}
            </p>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* Information + Loan Summary */}
      {/* ================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Personal Information */}

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">

          <h3 className="font-semibold text-lg mb-5">
            Personal Information
          </h3>

          <div className="space-y-5">

            <div className="flex items-start gap-3 min-w-0">

              <FaIdCard className="text-slate-500 mt-1 shrink-0" />

              <div className="min-w-0">
                <p className="text-gray-500 text-sm">
                  National ID
                </p>

                <p className="break-words">
                  {borrower.national_id || "Not provided"}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3 min-w-0">

              <FaPhone className="text-slate-500 mt-1 shrink-0" />

              <div className="min-w-0">
                <p className="text-gray-500 text-sm">
                  Phone
                </p>

                <p className="break-words">
                  {borrower.phone || "Not provided"}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3 min-w-0">

              <FaEnvelope className="text-slate-500 mt-1 shrink-0" />

              <div className="min-w-0">
                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <p className="break-words">
                  {borrower.email || "No email"}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3 min-w-0">

              <FaMapMarkerAlt className="text-slate-500 mt-1 shrink-0" />

              <div className="min-w-0">
                <p className="text-gray-500 text-sm">
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

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">

          <h3 className="font-semibold text-lg mb-5">
            Loan Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">

            {/* Total Loans */}

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <FaMoneyBillWave className="text-blue-600 text-xl" />
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Total Loans
                </p>

                <p className="text-2xl font-bold">
                  {summary?.total_loans || 0}
                </p>
              </div>

            </div>

            {/* Active Loans */}

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Active Loans
                </p>

                <p className="text-2xl font-bold text-green-600">
                  {summary?.active_loans || 0}
                </p>
              </div>

            </div>

            {/* Total Borrowed */}

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <FaMoneyBillWave className="text-purple-600 text-xl" />
              </div>

              <div className="min-w-0">
                <p className="text-gray-500 text-sm">
                  Total Borrowed
                </p>

                <p className="text-lg md:text-xl font-bold break-words">
                  {formatCurrency(
                    summary?.total_borrowed
                  )}
                </p>
              </div>

            </div>

            {/* Outstanding Balance */}

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                <FaClock className="text-red-600 text-xl" />
              </div>

              <div className="min-w-0">
                <p className="text-gray-500 text-sm">
                  Outstanding Balance
                </p>

                <p className="text-lg md:text-xl font-bold text-red-600 break-words">
                  {formatCurrency(
                    summary?.outstanding_balance
                  )}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* Loans */}
      {/* ================================= */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="p-4 md:p-6 border-b">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            <div>
              <h3 className="font-semibold text-lg">
                Loans
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Loans belonging to {borrower.full_name}
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {loans.length} loan
              {loans.length !== 1 ? "s" : ""}
            </span>

          </div>

        </div>

        {loans.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead className="bg-slate-100">

                <tr>

                  <th className="text-left px-6 py-4">
                    Principal
                  </th>

                  <th className="text-left px-6 py-4">
                    Interest
                  </th>

                  <th className="text-left px-6 py-4">
                    Duration
                  </th>

                  <th className="text-left px-6 py-4">
                    Total
                  </th>

                  <th className="text-left px-6 py-4">
                    Paid
                  </th>

                  <th className="text-left px-6 py-4">
                    Balance
                  </th>

                  <th className="text-left px-6 py-4">
                    Due Date
                  </th>

                  <th className="text-left px-6 py-4">
                    Status
                  </th>

                  <th className="text-center px-6 py-4">
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

                    <td className="px-6 py-4 font-medium">
                      {formatCurrency(
                        loan.principal_amount
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {Number(
                        loan.interest_rate || 0
                      )}%
                    </td>

                    <td className="px-6 py-4">

                      {loan.duration_value}{" "}

                      {loan.duration_unit}

                    </td>

                    <td className="px-6 py-4">
                      {formatCurrency(
                        loan.total_amount
                      )}
                    </td>

                    <td className="px-6 py-4 text-green-600">
                      {formatCurrency(
                        loan.amount_paid
                      )}
                    </td>

                    <td className="px-6 py-4 text-red-600 font-semibold">
                      {formatCurrency(
                        loan.balance
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {formatDate(loan.due_date)}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                          loan.status
                        )}`}
                      >
                        {loan.status}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-center">

                      <button
                        onClick={() =>
                          navigate(
                            `/loans/view/${loan.loan_id}`
                          )
                        }
                        className="px-4 py-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg"
                      >
                        View
                      </button>

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

            <button
              onClick={() =>
                navigate("/loans/create")
              }
              className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Create Loan
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default ViewBorrower;