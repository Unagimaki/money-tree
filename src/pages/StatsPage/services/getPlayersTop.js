import { axiosInstance } from "../../../services/axios";
import { ApiUrl } from "../../../utils/config";

export const getPlayersTop = async (token, page) => {
	if (!token) {
		console.log(`Error: Missing pars in getPlayersTop func`);
		return;
	}

	const headers = {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};
	const params = {
		// take: amount,
		page
	// Здесь можно добавить любые другие параметры
	};

	const result = await axiosInstance.get(`https://${ApiUrl}/api/player/top`, {
		headers,
		params, // Параметры будут автоматически сериализованы в строку запроса
	});
	return result;
}
