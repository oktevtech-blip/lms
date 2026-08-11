// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaPlus,
//   FaEye,
//   FaEdit,
//   FaTrash,
// } from "react-icons/fa";

// import {
//   getBorrowers,
//   deleteBorrower,
// } from "../services/borrowerService";

// const Borrowers = () => {
//   const [borrowers, setBorrowers] = useState([]);
//   const [search, setSearch] = useState("");

//   const loadBorrowers = async () => {
//     try {
//       const data = await getBorrowers();
//       setBorrowers(data);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load borrowers.");
//     }
//   };

//   useEffect(() => {
//     loadBorrowers();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this borrower?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteBorrower(id);

//       alert("Borrower deleted successfully.");

//       loadBorrowers();
//     } catch (error) {
//       console.error(error);

//       alert("Failed to delete borrower.");
//     }
//   };

//   const filteredBorrowers = borrowers.filter((borrower) => {
//     const searchTerm = search.toLowerCase();

//     return (
//       borrower.full_name.toLowerCase().includes(searchTerm) ||
//       borrower.phone.toLowerCase().includes(searchTerm) ||
//       borrower.national_id.toLowerCase().includes(searchTerm)
//     );
//   });

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold">
//             Borrowers
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Manage all registered borrowers
//           </p>
//         </div>

//         <Link
//           to="/borrowers/add"
//           className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition"
//         >
//           <FaPlus />
//           Add Borrower
//         </Link>
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

//           <input
//             type="text"
//             placeholder="Search borrower..."
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//             className="border rounded-lg px-4 py-3 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />

//           <div className="text-sm text-gray-500">
//             Total Borrowers:{" "}
//             <span className="font-semibold text-slate-800">
//               {filteredBorrowers.length}
//             </span>
//           </div>

//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">

//         <table className="w-full">

//           <thead className="bg-slate-100">
//             <tr>
//               <th className="text-left px-6 py-4">
//                 #
//               </th>

//               <th className="text-left px-6 py-4">
//                 Name
//               </th>

//               <th className="text-left px-6 py-4">
//                 Phone
//               </th>

//               <th className="text-left px-6 py-4">
//                 National ID
//               </th>

//               <th className="text-center px-6 py-4">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody>

//             {filteredBorrowers.length > 0 ? (

//               filteredBorrowers.map(
//                 (borrower, index) => (
//                   <tr
//                     key={borrower.borrower_id}
//                     className="border-t hover:bg-slate-50"
//                   >
//                     <td className="px-6 py-4">
//                       {index + 1}
//                     </td>

//                     <td className="px-6 py-4 font-medium">
//                       {borrower.full_name}
//                     </td>

//                     <td className="px-6 py-4">
//                       {borrower.phone}
//                     </td>

//                     <td className="px-6 py-4">
//                       {borrower.national_id}
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="flex justify-center gap-2">

//                         <Link
//                           to={`/borrowers/view/${borrower.borrower_id}`}
//                           className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
//                           title="View"
//                         >
//                           <FaEye />
//                         </Link>

//                         <button
//                           className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition"
//                           title="Edit"
//                         >
//                           <FaEdit />
//                         </button>

//                         <button
//                           onClick={() =>
//                             handleDelete(
//                               borrower.borrower_id
//                             )
//                           }
//                           className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
//                           title="Delete"
//                         >
//                           <FaTrash />
//                         </button>

//                       </div>
//                     </td>
//                   </tr>
//                 )
//               )

//             ) : (

//               <tr>
//                 <td
//                   colSpan="5"
//                   className="text-center py-12"
//                 >
//                   <div className="flex flex-col items-center">

//                     <div className="text-5xl mb-3">
//                       👤
//                     </div>

//                     <h3 className="text-lg font-semibold">
//                       No Borrowers Found
//                     </h3>

//                     <p className="text-gray-500 mt-1">
//                       Start by adding your first borrower.
//                     </p>

//                     <Link
//                       to="/borrowers/add"
//                       className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//                     >
//                       Add Borrower
//                     </Link>

//                   </div>
//                 </td>
//               </tr>

//             )}

//           </tbody>

//         </table>

//         {/* Footer */}

//         <div className="border-t px-6 py-4 flex justify-between items-center">

//           <p className="text-sm text-gray-500">
//             Showing {filteredBorrowers.length} borrower(s)
//           </p>

//           <div className="flex gap-2">
//             <button className="border px-4 py-2 rounded-lg hover:bg-gray-50">
//               Previous
//             </button>

//             <button className="border px-4 py-2 rounded-lg hover:bg-gray-50">
//               Next
//             </button>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Borrowers;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilePdf,
} from "react-icons/fa";

import {
  getBorrowers,
  deleteBorrower,
} from "../services/borrowerService";

const Borrowers = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [search, setSearch] = useState("");

  const loadBorrowers = async () => {
    try {
      const data = await getBorrowers();
      setBorrowers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      alert("Failed to load borrowers.");
    }
  };

  useEffect(() => {
    loadBorrowers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this borrower?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBorrower(id);

      alert("Borrower deleted successfully.");

      loadBorrowers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete borrower.");
    }
  };

  // ==============================
  // Export / Print PDF
  // ==============================
  const handleExportPDF = () => {
    window.print();
  };

  const filteredBorrowers = borrowers.filter((borrower) => {
    const searchTerm = search.toLowerCase();

    return (
      borrower.full_name?.toLowerCase().includes(searchTerm) ||
      borrower.phone?.toLowerCase().includes(searchTerm) ||
      borrower.national_id?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="borrowers-page">
      {/* =========================
          Header
      ========================== */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 print:hidden">
        <div>
          <h1 className="text-3xl font-bold">
            Borrowers
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all registered borrowers
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Export PDF */}
          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-4 py-3 rounded-lg transition"
          >
            <FaFilePdf />
            Export PDF
          </button>

          {/* Add Borrower */}
          <Link
            to="/borrowers/add"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition"
          >
            <FaPlus />
            Add Borrower
          </Link>
        </div>
      </div>

      {/* =========================
          Print Header
      ========================== */}
      <div className="hidden print:block mb-6">
        <h1 className="text-2xl font-bold">
          Loan Management System
        </h1>

        <h2 className="text-xl font-semibold mt-2">
          Borrowers Register
        </h2>

        <p className="text-sm text-gray-600 mt-1">
          Borrower signature register
        </p>

        <p className="text-sm text-gray-600 mt-1">
          Date: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* =========================
          Search
      ========================== */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search borrower..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-3 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="text-sm text-gray-500">
            Total Borrowers:{" "}
            <span className="font-semibold text-slate-800">
              {filteredBorrowers.length}
            </span>
          </div>
        </div>
      </div>

      {/* =========================
          Table
      ========================== */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden print:shadow-none print:rounded-none">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead className="bg-slate-100 print:bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4 border-b">
                  #
                </th>

                <th className="text-left px-6 py-4 border-b">
                  Name
                </th>

                <th className="text-left px-6 py-4 border-b">
                  Phone
                </th>

                <th className="text-left px-6 py-4 border-b">
                  National ID
                </th>

                {/* Signature column */}
                <th className="text-left px-6 py-4 border-b">
                  Signature
                </th>

                {/* Actions hidden when printing */}
                <th className="text-center px-6 py-4 border-b print:hidden">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredBorrowers.length > 0 ? (
                filteredBorrowers.map((borrower, index) => (
                  <tr
                    key={borrower.borrower_id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      {index + 1}
                    </td>

                    <td className="px-6 py-5 font-medium">
                      {borrower.full_name}
                    </td>

                    <td className="px-6 py-5">
                      {borrower.phone}
                    </td>

                    <td className="px-6 py-5">
                      {borrower.national_id}
                    </td>

                    {/* =========================
                        Signature Slot
                    ========================== */}
                    <td className="px-6 py-5">
                      <div className="w-36">
                        <div className="border-b-2 border-gray-700 h-7"></div>

                        <p className="text-xs text-gray-500 text-center mt-1">
                          Signature
                        </p>
                      </div>
                    </td>

                    {/* =========================
                        Actions
                    ========================== */}
                    <td className="px-6 py-5 print:hidden">
                      <div className="flex justify-center gap-2">
                        {/* View */}
                        <Link
                          to={`/borrowers/view/${borrower.borrower_id}`}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                          title="View"
                        >
                          <FaEye />
                        </Link>

                        {/* Edit */}
                        <button
                          className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            handleDelete(
                              borrower.borrower_id
                            )
                          }
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                          title="Delete"
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
                    colSpan="6"
                    className="text-center py-12"
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-5xl mb-3">
                        👤
                      </div>

                      <h3 className="text-lg font-semibold">
                        No Borrowers Found
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Start by adding your first borrower.
                      </p>

                      <Link
                        to="/borrowers/add"
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg print:hidden"
                      >
                        Add Borrower
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =========================
            Footer
        ========================== */}
        <div className="border-t px-6 py-4 flex justify-between items-center print:hidden">
          <p className="text-sm text-gray-500">
            Showing {filteredBorrowers.length} borrower(s)
          </p>

          <div className="flex gap-2">
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-50">
              Previous
            </button>

            <button className="border px-4 py-2 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>

        {/* =========================
            Print Footer
        ========================== */}
        <div className="hidden print:block mt-8 pt-4 border-t">
          <p className="text-sm text-gray-600">
            Total Borrowers: {filteredBorrowers.length}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Signature confirms that the borrower details above
            have been reviewed and acknowledged.
          </p>
        </div>
      </div>

      {/* =========================
          Print CSS
      ========================== */}
      <style>
        {`
          @media print {
            @page {
              size: A4 landscape;
              margin: 15mm;
            }

            body {
              background: white !important;
            }

            .borrowers-page {
              width: 100%;
            }

            table {
              width: 100% !important;
            }

            th,
            td {
              border: 1px solid #d1d5db;
            }

            tr {
              page-break-inside: avoid;
            }

            thead {
              display: table-header-group;
            }

            .print\\:hidden {
              display: none !important;
            }

            .print\\:block {
              display: block !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Borrowers;