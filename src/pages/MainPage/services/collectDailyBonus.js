import { baseURL } from "../../../App";
import { axiosInstance } from "../../../services/axios";

export const collectDailyBonus = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: true,
    };
    return axiosInstance.post(
        `https://${baseURL}/api/daily-bonuses/collect-bonus`,
        {},
        config
    );
}