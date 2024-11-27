import { baseURL } from "../../../App"
import { axiosInstance } from "../../../services/axios"

export const buyAutoBotLevel = async (token, autoBotId, autoBotLevelId) => {
    	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		withCredentials: true,
	}
	
	const result = await axiosInstance.post(
		`https://${baseURL}/api/auto-bot/${autoBotId}/buy/${autoBotLevelId}`,
		{}, config
	)
	return result
}