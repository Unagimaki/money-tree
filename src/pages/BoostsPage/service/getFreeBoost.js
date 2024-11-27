import { baseURL } from '../../../App';
import { axiosInstance } from '../../../services/axios';

export const getFreeBoost = async (token, freeBoostId) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		withCredentials: true,
	}
	const result = await axiosInstance.post(
		`https://${baseURL}/api/free-boosts/${freeBoostId}/use`,
		{}, config
	)
	return result
};
