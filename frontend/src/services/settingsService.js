const API_URL = "http://localhost:5000/api/users";

const getUserId = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return user?.user_id;
};

export const getProfile = async () => {
  const response = await fetch(
    `${API_URL}/profile/${getUserId()}`
  );

  if (!response.ok) {
    throw new Error("Failed to load profile");
  }

  return await response.json();
};

export const updateProfile = async (
  profile
) => {
  const response = await fetch(
    `${API_URL}/profile/${getUserId()}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(profile),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};