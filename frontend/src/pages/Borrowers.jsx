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

  // ==============================
  // Load Borrowers
  // ==============================
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

  // ==============================
  // Delete Borrower
  // ==============================
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

  // ==============================
  // Search
  // ==============================
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

      {/* =====================================================
          NORMAL SCREEN HEADER
      ====================================================== */}
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
            className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-5 py-3 rounded-lg transition"
          >
            <FaFilePdf />
            Export PDF
          </button>

          {/* Add Borrower */}
          <Link
            to="/borrowers/add"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition"
          >
            <FaPlus />
            Add Borrower
          </Link>

        </div>

      </div>


      {/* =====================================================
          PRINT-ONLY HEADER
      ====================================================== */}

      <div className="hidden print:block print-header">

        <div className="print-company-header">

          <div>
            <h1>
              Loan Management System
            </h1>

            <h2>
              Borrowers Register
            </h2>
          </div>

          <div className="print-date">
            <p>
              Date: {new Date().toLocaleDateString()}
            </p>
          </div>

        </div>

        <div className="print-divider"></div>

      </div>


      {/* =====================================================
          SEARCH
      ====================================================== */}

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


      {/* =====================================================
          BORROWERS TABLE
      ====================================================== */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden print:shadow-none print:rounded-none">

        <div className="overflow-x-auto print:overflow-visible">

          <table className="w-full min-w-[850px] border-collapse print:min-w-0">

            {/* =========================
                TABLE HEADER
            ========================== */}

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

                <th className="text-left px-6 py-4 border-b signature-column">
                  Signature
                </th>

                {/* Actions are never printed */}
                <th className="text-center px-6 py-4 border-b print:hidden">
                  Actions
                </th>

              </tr>

            </thead>


            {/* =========================
                TABLE BODY
            ========================== */}

            <tbody>

              {filteredBorrowers.length > 0 ? (

                filteredBorrowers.map((borrower, index) => (

                  <tr
                    key={borrower.borrower_id}
                    className="border-t hover:bg-slate-50 print:hover:bg-transparent"
                  >

                    {/* Number */}
                    <td className="px-6 py-5 print:px-3 print:py-5">
                      {index + 1}
                    </td>


                    {/* Name */}
                    <td className="px-6 py-5 font-medium print:px-3 print:py-5">
                      {borrower.full_name}
                    </td>


                    {/* Phone */}
                    <td className="px-6 py-5 print:px-3 print:py-5">
                      {borrower.phone}
                    </td>


                    {/* National ID */}
                    <td className="px-6 py-5 print:px-3 print:py-5">
                      {borrower.national_id}
                    </td>


                    {/* =================================================
                        SIGNATURE SLOT
                    ================================================== */}

                    <td className="px-6 py-5 print:px-3 print:py-5">

                      <div className="signature-area">

                        <div className="signature-line"></div>

                        <p className="signature-label">
                          Signature
                        </p>

                      </div>

                    </td>


                    {/* =================================================
                        ACTIONS
                    ================================================== */}

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


        {/* =====================================================
            NORMAL SCREEN FOOTER
        ====================================================== */}

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


        {/* =====================================================
            PRINT-ONLY FOOTER
        ====================================================== */}

        <div className="hidden print:block print-footer">

          <div className="print-total">
            Total Borrowers: {filteredBorrowers.length}
          </div>

          <div className="print-note">
            I confirm that the information provided above is correct.
          </div>

        </div>

      </div>


      {/* =====================================================
          PRINT STYLES
      ====================================================== */}

      <style>
        {`

          /* ==========================================
             PRINT PAGE
          ========================================== */

          @media print {

            @page {
              size: A4 landscape;
              margin: 12mm;
            }


            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }


            html,
            body {
              width: 100%;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }


            body {
              font-size: 12px !important;
            }


            /*
              Hide the application sidebar,
              navigation and other layout elements.
            */

            aside,
            nav,
            header {
              display: none !important;
            }


            /*
              Remove application layout spacing.
            */

            .borrowers-page {
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }


            /*
              Remove screen-only shadows,
              borders and rounded cards.
            */

            .borrowers-page .bg-white {
              background: white !important;
            }


            /*
              Print-only elements.
            */

            .print\\:hidden {
              display: none !important;
            }


            .print\\:block {
              display: block !important;
            }


            /*
              ========================================
              PRINT HEADER
              ========================================
            */

            .print-header {
              display: block !important;
              margin-bottom: 12px;
            }


            .print-company-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }


            .print-company-header h1 {
              margin: 0;
              font-size: 22px;
              font-weight: 700;
              color: #111827;
            }


            .print-company-header h2 {
              margin: 4px 0 0;
              font-size: 17px;
              font-weight: 600;
              color: #374151;
            }


            .print-date {
              font-size: 12px;
              color: #4b5563;
            }


            .print-date p {
              margin: 0;
            }


            .print-divider {
              width: 100%;
              border-bottom: 2px solid #111827;
              margin-top: 10px;
            }


            /*
              ========================================
              TABLE
              ========================================
            */

            table {
              width: 100% !important;
              min-width: 0 !important;
              table-layout: fixed !important;
              border-collapse: collapse !important;
            }


            thead {
              display: table-header-group;
            }


            tbody {
              display: table-row-group;
            }


            tr {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }


            th,
            td {
              border: 1px solid #9ca3af !important;
              color: #111827 !important;
              vertical-align: middle !important;
            }


            th {
              background: #f1f5f9 !important;
              font-weight: 700 !important;
              font-size: 12px !important;
            }


            td {
              font-size: 12px !important;
            }


            /*
              Column widths.

              Signature receives more space because
              the borrower must physically sign.
            */

            th:nth-child(1),
            td:nth-child(1) {
              width: 6%;
              text-align: center;
            }


            th:nth-child(2),
            td:nth-child(2) {
              width: 23%;
            }


            th:nth-child(3),
            td:nth-child(3) {
              width: 20%;
            }


            th:nth-child(4),
            td:nth-child(4) {
              width: 24%;
            }


            th:nth-child(5),
            td:nth-child(5) {
              width: 27%;
            }


            /*
              ========================================
              SIGNATURE
              ========================================
            */

            .signature-area {
              width: 100%;
              min-height: 48px;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              align-items: center;
            }


            .signature-line {
              width: 90%;
              border-bottom: 1.5px solid #374151;
              height: 28px;
            }


            .signature-label {
              margin: 3px 0 0;
              font-size: 9px;
              color: #6b7280;
              text-align: center;
            }


            /*
              ========================================
              PRINT FOOTER
              ========================================
            */

            .print-footer {
              display: block !important;
              margin-top: 15px;
              padding-top: 8px;
              border-top: 1px solid #9ca3af;
            }


            .print-total {
              font-size: 11px;
              font-weight: 600;
              color: #374151;
            }


            .print-note {
              margin-top: 4px;
              font-size: 10px;
              color: #6b7280;
            }


            /*
              Prevent unnecessary overflow.
            */

            .overflow-x-auto {
              overflow: visible !important;
            }


            /*
              Remove rounded corners/shadows during printing.
            */

            .rounded-xl,
            .rounded-lg {
              border-radius: 0 !important;
            }


            .shadow-sm {
              box-shadow: none !important;
            }

          }

        `}
      </style>

    </div>
  );
};

export default Borrowers;