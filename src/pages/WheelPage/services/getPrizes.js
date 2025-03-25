import { baseURL } from "../../../App";
import { axiosInstance } from "../../../services/axios";

export const getPrizes = async (token, tickets) => {
    if (!token || !tickets) {  // Проверяем, что оба параметра переданы
        console.error(`Error: Missing ${!token ? "token" : "tickets"}`);
        return;
    }

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    try {
        const result = await axiosInstance.get(`https://${baseURL}/api/wheel?tickets=${tickets}`, {
            headers,
        });

        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
