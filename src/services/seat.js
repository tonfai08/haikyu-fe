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

export const postData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/data`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
