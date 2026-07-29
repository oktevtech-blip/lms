import API_URL from "./api";

export const getPayments = async () => {
  const response = await fetch(`${API_URL}/payments`);

  if (!response.ok) {
    throw new Error("Failed to load payments");
  }

  return response.json();
};

export const createPayment = async (payment) => {
  const response = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  });

  if (!response.ok) {
    throw new Error("Failed to record payment");
  }

  return response.json();
};