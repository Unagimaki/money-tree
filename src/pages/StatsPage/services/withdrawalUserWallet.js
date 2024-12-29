import { baseURL } from "../../../App";
import { axiosInstance } from "../../../services/axios";

export const withdrawalUserWallet = (token, amount) => {
    
    if (!token) {
        console.log(`withdrawalUserWallet error: no token:` + token);
        return
    }
        
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: true,
	};
    const data = {
        amount
    };
	return axiosInstance.post(
		`https://${baseURL}/api/wallet/withdraw`,
		data,
		config
	);
}