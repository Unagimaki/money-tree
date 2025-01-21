import { axiosInstance } from "../../../services/axios";
import { ApiUrl } from "../../../utils/config";

export const getPlayersTop = async (token, league, page = 1) => {	
	if (!token) {
		console.log(`Error: Missing pars in getPlayersTop func`);
		return;
	}

	const headers = {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};
	console.log(`https://${ApiUrl}/api/player/top?league=${league}&page=${page}`);
	
	const result = await axiosInstance.get(`https://${ApiUrl}/api/player/top?league=${league}&page=${page}`, {
		headers,
	});
	
	return result;
}
