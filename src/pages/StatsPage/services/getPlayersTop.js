import axios from 'axios';
import { baseURL } from '../../../App'

export const getPlayersTop = async (token) => {
	const headers = {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};
	const headersJson = JSON.stringify(headers);

	const result = await axios.get(`https://${baseURL}/api/player/top`, {
		headers: JSON.parse(headersJson),
	});
	console.log(result.data);

	return result;
};
