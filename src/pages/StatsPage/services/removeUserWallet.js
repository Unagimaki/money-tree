import { baseURL } from "../../../App";
import { axiosInstance } from "../../../services/axios";

export const removeUserWallet = (token) => {        
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: true,
	};
	return axiosInstance.delete(
		`https://${baseURL}/api/wallet`,
		{},
		config
	);
}