import { baseURL } from "../../../App";
import { axiosInstance } from "../../../services/axios";

export const saveUserWallet = (token, wallet) => {
    console.log(wallet);
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: true,
    };

    // Создаем объект с данными, которые нужно отправить в теле запроса
    const data = {
        address: wallet,
    };

    return axiosInstance.post(
        `https://${baseURL}/api/wallet`,
        data, // Передаем объект с данными в теле запроса
        config
    );
}