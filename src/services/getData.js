import { ApiUrl } from '../utils/config';
import { axiosInstance } from './axios';

export const getData = async (token, url) => {
    if (!token || !url) {
        console.error(`Error: Missing ${!token ? "token" : "url"}`);
        return;
    }

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    const result = await axiosInstance.get(`https://${ApiUrl}/api/${url}`, { headers });
    console.log(result);
    
    return result;
}
