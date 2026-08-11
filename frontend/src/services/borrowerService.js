// import API_URL from "./api";

// // Get all borrowers
// export const getBorrowers = async () => {
//   const response = await fetch(
//     `${API_URL}/borrowers`
//   );

//   return response.json();
// };

// // Get one borrower
// export const getBorrower = async (id) => {
//   const response = await fetch(
//     `${API_URL}/borrowers/${id}`
//   );

//   return response.json();
// };

// // Create borrower
// export const createBorrower = async (data) => {
//   const response = await fetch(
//     `${API_URL}/borrowers`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }
//   );

//   return response.json();
// };

// // Update borrower
// export const updateBorrower = async (
//   id,
//   data
// ) => {
//   const response = await fetch(
//     `${API_URL}/borrowers/${id}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }
//   );

//   return response.json();
// };

// // Delete borrower
// export const deleteBorrower = async (
//   id
// ) => {
//   const response = await fetch(
//     `${API_URL}/borrowers/${id}`,
//     {
//       method: "DELETE",
//     }
//   );

//   return response.json();
// };

import API_URL from "./api";

// =============================
// Get All Borrowers
// =============================
export const getBorrowers = async () => {
  const response = await fetch(`${API_URL}/borrowers`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load borrowers"
    );
  }

  return data;
};

// =============================
// Get Single Borrower
// =============================
export const getBorrower = async (id) => {
  const response = await fetch(
    `${API_URL}/borrowers/${id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Borrower not found"
    );
  }

  return data;
};

// =============================
// Create Borrower
// =============================
export const createBorrower = async (data) => {
  const response = await fetch(
    `${API_URL}/borrowers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create borrower"
    );
  }

  return result;
};

// =============================
// Update Borrower
// =============================
export const updateBorrower = async (id, data) => {
  const response = await fetch(
    `${API_URL}/borrowers/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update borrower"
    );
  }

  return result;
};

// =============================
// Delete Borrower
// =============================
export const deleteBorrower = async (id) => {
  const response = await fetch(
    `${API_URL}/borrowers/${id}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete borrower"
    );
  }

  return result;
};