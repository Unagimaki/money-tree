import { baseURL } from "../../../App";
import { axiosInstance } from "../../../services/axios";

export const autobotLaunch = async (token) => {
	const result = axiosInstance.post(
		`https://${baseURL}/api/auto-bot/use`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
	);
	return result;
}