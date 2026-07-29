import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
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
      setBorrowers(data);
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

  const filteredBorrowers = borrowers.filter((borrower) => {
    const searchTerm = search.toLowerCase();

    return (
      borrower.full_name.toLowerCase().includes(searchTerm) ||
      borrower.phone.toLowerCase().includes(searchTerm) ||
      borrower.national_id.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Borrowers
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all registered borrowers
          </p>
        </div>

        <Link
          to="/borrowers/add"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition"
        >
          <FaPlus />
          Add Borrower
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <input
            type="text"
            placeholder="Search borrower..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
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

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-4">
                #
              </th>

              <th className="text-left px-6 py-4">
                Name
              </th>

              <th className="text-left px-6 py-4">
                Phone
              </th>

              <th className="text-left px-6 py-4">
                National ID
              </th>

              <th className="text-center px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredBorrowers.length > 0 ? (

              filteredBorrowers.map(
                (borrower, index) => (
                  <tr
                    key={borrower.borrower_id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {borrower.full_name}
                    </td>

                    <td className="px-6 py-4">
                      {borrower.phone}
                    </td>

                    <td className="px-6 py-4">
                      {borrower.national_id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">

                        <Link
                          to={`/borrowers/view/${borrower.borrower_id}`}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                          title="View"
                        >
                          <FaEye />
                        </Link>

                        <button
                          className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>

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
                )
              )

            ) : (

              <tr>
                <td
                  colSpan="5"
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
                      className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Add Borrower
                    </Link>

                  </div>
                </td>
              </tr>

            )}

          </tbody>

        </table>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-between items-center">

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

      </div>
    </div>
  );
};

export default Borrowers;