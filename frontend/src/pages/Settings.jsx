import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/settingsService";

const Settings = () => {
  const loggedInUser = JSON.parse(
    localStorage.getItem("user")
  );

  const userId = loggedInUser?.user_id;

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userId) {
      loadProfile();
    }
  }, [userId]);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setFormData((prev) => ({
        ...prev,
        full_name: data.full_name,
        username: data.username,
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to load profile.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await updateProfile({
        full_name: formData.full_name,
        username: formData.username,
        currentPassword:
          formData.currentPassword,
        newPassword: formData.newPassword,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...loggedInUser,
          full_name: formData.full_name,
          username: formData.username,
        })
      );

      alert("Profile updated successfully.");

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
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
              required
            />
          </div>

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
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;