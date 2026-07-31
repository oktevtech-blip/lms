const API_URL = "https://lms-backend-w2r8.onrender.com/api/users";
//const API_URL = "http://localhost:5000/api/users";

// ==========================
// Get All Users
// ==========================
export const getUsers = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return await response.json();
};

// ==========================
// Create User
// ==========================
export const createUser = async (userData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// ==========================
// Delete User
// ==========================
export const deleteUser = async (userId) => {
  const response = await fetch(
    `${API_URL}/${userId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};