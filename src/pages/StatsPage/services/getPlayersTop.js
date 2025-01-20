import { axiosInstance } from "../../../services/axios";
import { ApiUrl } from "../../../utils/config";

export const getPlayersTop = async (token, league, take = 50) => {	
	if (!token) {
		console.log(`Error: Missing pars in getPlayersTop func`);
		return;
	}

	const headers = {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};
	console.log(`https://${ApiUrl}/api/player/top?league=${league}&take=${take}`);
	
	const result = await axiosInstance.get(`https://${ApiUrl}/api/player/top?league=${league}&take=${take}`, {
		headers,
	});
	
	return result;
}
