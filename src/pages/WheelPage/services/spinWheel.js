import { baseURL } from "../../../App";
import { axiosInstance } from "../../../services/axios";


export const speenWheel = (token, tickets) => { 
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true,
        };
        return axiosInstance.post(
            `https://${baseURL}/api/wheel`,
            {
                tickets
            },
            config
        );
}