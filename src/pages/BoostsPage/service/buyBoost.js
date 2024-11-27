import { baseURL } from '../../../App';
import { axiosInstance } from '../../../services/axios';

export const buyBoost = async (token, boostId, boostLevelId) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		withCredentials: true,
	}

	const result = await axiosInstance.post(
		`https://${baseURL}/api/boosts/${boostId}/buy/${boostLevelId}`,
		{}, config
	)
	return result
};
