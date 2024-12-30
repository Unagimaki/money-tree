import axios from 'axios';
import { baseURL } from '../App'
import { isDevelopment } from '../utils/config';
import { axiosInstance } from './axios'
import { getUserInfo } from './getUserInfo'

let playerData = null;

const example = {
	tgId: '123456789',
	isPremium: true,
	userName: 'johndoe',
	initData: 'query_id=AAFkXtYUAAAAAGRe1hR90p4Y&user=%7B%22id%22%3A349593188%2C%22first_name%22%3A%22Dmitryyyyyy%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22dmitrygalanin%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FKVcb7MJLCmhyTLNWoENZ5jC2U2ezoSDaV0dB1NewmJ0.svg%22%7D&auth_date=1731617893&hash=f08c83e2eace3130575186ab0af7a0b6148de075a0f8cc371aeda502227c8084'
};

export const UserLogin = data => {
	if (playerData) return playerData;

	// Выбор источника данных
	const body = isDevelopment
		? example
		: {
			tgId: getUserInfo(data).user.id,
			isPremium: getUserInfo(data).user.is_premium ?? false,
			userName: getUserInfo(data).user?.username || `Anonymous_${getUserInfo(data).user.id}`,
			profileImageUrl: getUserInfo(data).user?.photo_url || '',
			initData: data
		};
		console.log(body);
		
	return axios
		.post(`https://moneytree.extensi.one/api/auth/login`, body, {
			withCredentials: true
		})
		.then(result => {
			const newPlayerData = result.data;

			// Если данные о игроке изменились, обновляем состояние Redux
			if (newPlayerData !== playerData) {
				playerData = newPlayerData;
			}
			return playerData;
		})
		.catch(e => {
			console.log(`User login error: ${e}`);
		})
};
