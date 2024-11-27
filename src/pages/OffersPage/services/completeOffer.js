import { axiosInstance } from '../../../services/axios';
import { baseURL } from '../../../App';

export const completeOffer = async (token, id) => {
	const result = axiosInstance.post(
		`https://${baseURL}/api/offers/${id}/complete`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
	);
	return result;
};
