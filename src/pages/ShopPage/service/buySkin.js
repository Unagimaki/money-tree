import { baseURL } from '../../../App';
import { axiosInstance } from '../../../services/axios';

export const buySkin = (token, shopItemId, shopItemLevelId) => {	
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		withCredentials: true,
	};
	return axiosInstance.post(
		`https://${baseURL}/api/shop-item/${shopItemId}/buy/${shopItemLevelId}`,
		{},
		config
	);
};
