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
} from "react-icons/fa";

import { getBorrower } from "../services/borrowerService";
import { getLoans } from "../services/loanService";

const ViewBorrower = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [borrower, setBorrower] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBorrowerData();
  }, [id]);

  const loadBorrowerData = async () => {
    try {
      setLoading(true);

      // Fetch the borrower using the existing working endpoint
      const borrowerData = await getBorrower(id);

      setBorrower(borrowerData);

      // Fetch all loans
      const loansData = await getLoans();

      // Make sure we received an array
      const allLoans = Array.isArray(loansData) ? loansData : [];

      // Only keep loans belonging to this borrower
      const borrowerLoans = allLoans.filter(
        (loan) =>
          Number(loan.borrower_id) === Number(id)
      );

      setLoans(borrowerLoans);
    } catch (error) {
      console.error("Failed to load borrower details:", error);

      setBorrower(null);
      setLoans([]);

      alert(
        error.message || "Failed to load borrower details."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // Loading
  // -----------------------------------------

  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading borrower...
      </div>
    );
  }

  // -----------------------------------------
  // Borrower not found
  // -----------------------------------------

  if (!borrower) {
    return (
      <div className="flex justify-center py-20 px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-lg w-full">
          <FaUser className="text-5xl text-gray-400 mx-auto mb-4" />

          <h2 className="text-2xl font-bold">
            Borrower Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            The borrower you are looking for could not be found.
          </p>

          <button
            onClick={() => navigate("/borrowers")}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Back to Borrowers
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // Loan calculations
  // -----------------------------------------

  const activeLoans = loans.filter(
    (loan) => loan.status === "Active"
  );

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

  // -----------------------------------------
  // Currency formatter
  // -----------------------------------------

  const formatCurrency = (amount) => {
    return `UGX ${Number(amount || 0).toLocaleString()}`;
  };

  return (
    <div className="w-full">

      {/* ============================= */}
      {/* Header */}
      {/* ============================= */}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">

        <button
          onClick={() => navigate("/borrowers")}
          className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 w-full sm:w-auto"
        >
          <FaArrowLeft />
          Back
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold">
          Borrower Details
        </h1>

      </div>

      {/* ============================= */}
      {/* Profile */}
      {/* ============================= */}

      <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 mb-6">

        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6">

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">

            <FaUser className="text-3xl sm:text-4xl text-green-600" />

          </div>

          <div className="text-center sm:text-left">

            <h2 className="text-xl sm:text-2xl font-bold">
              {borrower.full_name}
            </h2>

            <p className="text-gray-500 mt-1">
              Borrower ID: {borrower.borrower_id}
            </p>

          </div>

        </div>

      </div>

      {/* ============================= */}
      {/* Information */}
      {/* ============================= */}

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
                <p className="text-sm text-gray-500">
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
                <p className="text-sm text-gray-500">
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
                <p className="text-sm text-gray-500">
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
                <p className="text-sm text-gray-500">
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

          <h3 className="font-semibold text-lg mb-5">
            Loan Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5">

            <div>

              <p className="text-gray-500 text-sm">
                Active Loans
              </p>

              <p className="text-2xl font-bold mt-1">
                {activeLoans.length}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Total Borrowed
              </p>

              <p className="text-xl sm:text-2xl font-bold mt-1 break-words">
                {formatCurrency(totalBorrowed)}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Outstanding Balance
              </p>

              <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1 break-words">
                {formatCurrency(outstandingBalance)}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ============================= */}
      {/* Loans */}
      {/* ============================= */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="p-5 sm:p-6 border-b">

          <h3 className="font-semibold text-lg">
            Loans
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Loans belonging to {borrower.full_name}
          </p>

        </div>

        {loans.length > 0 ? (

          <>
            {/* Desktop/tablet table */}

            <div className="hidden md:block overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-100">

                  <tr>

                    <th className="text-left px-6 py-4">
                      Amount
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

                    <th className="text-left px-6 py-4">
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

                      <td className="px-6 py-4">
                        {formatCurrency(
                          loan.principal_amount
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {loan.interest_rate}%
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {formatCurrency(
                          loan.total_amount
                        )}
                      </td>

                      <td className="px-6 py-4 text-red-600 font-semibold">
                        {formatCurrency(
                          loan.balance
                        )}
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

                        <button
                          onClick={() =>
                            navigate(
                              `/loans/view/${loan.loan_id}`
                            )
                          }
                          className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 text-sm"
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* Mobile cards */}

            <div className="md:hidden p-4 space-y-4">

              {loans.map((loan) => (

                <div
                  key={loan.loan_id}
                  className="border rounded-xl p-4"
                >

                  <div className="grid grid-cols-2 gap-4">

                    <div>
                      <p className="text-xs text-gray-500">
                        Principal
                      </p>

                      <p className="font-semibold">
                        {formatCurrency(
                          loan.principal_amount
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Interest
                      </p>

                      <p className="font-semibold">
                        {loan.interest_rate}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Total
                      </p>

                      <p className="font-semibold">
                        {formatCurrency(
                          loan.total_amount
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Balance
                      </p>

                      <p className="font-semibold text-red-600">
                        {formatCurrency(
                          loan.balance
                        )}
                      </p>
                    </div>

                    <div>

                      <p className="text-xs text-gray-500 mb-1">
                        Status
                      </p>

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${
                          loan.status === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : loan.status === "Overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {loan.status}
                      </span>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/loans/view/${loan.loan_id}`
                      )
                    }
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  >
                    View Loan
                  </button>

                </div>

              ))}

            </div>
          </>

        ) : (

          <div className="text-center py-12 px-5">

            <div className="text-4xl mb-3">
              💰
            </div>

            <h4 className="font-semibold text-lg">
              No Loans Found
            </h4>

            <p className="text-gray-500 mt-1">
              This borrower does not have any loans yet.
            </p>

            <button
              onClick={() => navigate("/loans/create")}
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