import API_URL from "./api";

// =============================
// Get All Loans
// =============================
export const getLoans = async () => {
  const response = await fetch(`${API_URL}/loans`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load loans");
  }

  return data;
};

// =============================
// Get Single Loan
// =============================
export const getLoan = async (id) => {
  const response = await fetch(`${API_URL}/loans/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load loan");
  }

  return data;
};

// =============================
// Create Loan
// =============================
export const createLoan = async (loanData) => {
  const response = await fetch(`${API_URL}/loans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loanData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create loan");
  }

  return data;
};

// =============================
// Delete Loan
// =============================
export const deleteLoan = async (id) => {
  const response = await fetch(`${API_URL}/loans/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete loan");
  }

  return data;
};