import { baseURL } from "../../../App";
import { axiosInstance } from "../../../services/axios";

export const buyTicket = (id, token) => {	
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: true,
    };
    return axiosInstance.post(
        `https://${baseURL}/api/ticket-shop/${id}`,
        {},
        config
    );
};