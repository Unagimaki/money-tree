import { baseURL } from "../../../App";
import { axiosInstance } from "../../../services/axios";
import { ApiUrl } from "../../../utils/config";

export const getDailyBonuses = async (token) => {
    if (!token) {
        console.error(`Error: Missing token`);
        return;
    }

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    const take = 30

    const result = await axiosInstance.get(`https://${baseURL}/api/daily-bonuses`, {
        headers,
        params: {
            take,
        }
    });
    console.log(result.data);
    
    return result;
}