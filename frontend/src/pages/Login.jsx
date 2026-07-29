import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

      const data = await login(formData);

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Save token if your backend returns one
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert(`Welcome ${data.user.full_name}`);

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            Loan Management System
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;