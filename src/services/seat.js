import axios from "axios";

const API_URL = "https://haikyu-be.vercel.app/seat";

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getSeatGroup = async () => {
  try {
    const response = await axios.get(`${API_URL}/grouped`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const reserveSeats = async (seats) => {
  const token = localStorage.getItem("token");
  const data = {
    token: token,
    seats: seats,
  };
  try {
    const response = await axios.post(`${API_URL}/reserve-seats`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const updateSeat = async (seats) => {
  try {
    const response = await axios.put(`${API_URL}/update-seat`, seats, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Returns the updated seat information from the server
  } catch (error) {
    console.error("Error updating seat:", error);
    throw error; // It's good practice to re-throw the error so it can be handled by the caller
  }
};
