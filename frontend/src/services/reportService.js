import API_URL from "./api";

export const getReports = async () => {
  const response = await fetch(`${API_URL}/reports`);

  if (!response.ok) {
    throw new Error("Failed to load reports");
  }

  return response.json();
};