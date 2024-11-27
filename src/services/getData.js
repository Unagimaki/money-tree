import { baseURL } from '../App';
import { axiosInstance } from './axios';

export const getData = async (token, url) => {		
		const headers = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		}
	const result = await axiosInstance.get(`https://${baseURL}/api/${url}`, {headers})	
	return result
}
