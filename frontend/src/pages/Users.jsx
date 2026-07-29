import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import {
  getUsers,
  deleteUser,
} from "../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user) => {
    if (
      !window.confirm(
        `Delete ${user.full_name}?`
      )
    ) {
      return;
    }

    try {
      await deleteUser(user.user_id);

      alert("User deleted successfully.");

      loadUsers();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="text-gray-500">
            Manage system users
          </p>

        </div>

        <Link
          to="/users/add"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add User
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left px-6 py-4">
                Full Name
              </th>

              <th className="text-left px-6 py-4">
                Username
              </th>

              <th className="text-left px-6 py-4">
                Role
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-center px-6 py-4">
                Delete
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-10"
                >
                  Loading users...
                </td>

              </tr>

            ) : users.length > 0 ? (

              users.map((user) => (

                <tr
                  key={user.user_id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-4">
                    {user.full_name}
                  </td>

                  <td className="px-6 py-4">
                    {user.username}
                  </td>

                  <td className="px-6 py-4">
                    {user.role}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-center">

                    <button
                      onClick={() =>
                        handleDelete(user)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No users found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Users;