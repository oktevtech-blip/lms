import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../services/userService";

const AddUser = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    password: "",
    role: "Loan Officer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createUser(formData);

      alert("User created successfully.");

      navigate("/users");

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Add User
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Full Name */}

          <div>

            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter full name"
              required
            />

          </div>

          {/* Username */}

          <div>

            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter username"
              required
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter password"
              required
            />

          </div>

          {/* Role */}

          <div>

            <label className="block mb-2 font-medium">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Admin">
                Admin
              </option>

              <option value="Manager">
                Manager
              </option>

              <option value="Loan Officer">
                Loan Officer
              </option>

            </select>

          </div>

          {/* Buttons */}

          <div className="flex gap-3">

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg"
            >
              {loading ? "Saving..." : "Save User"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/users")}
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

export default AddUser;