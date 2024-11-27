import axios from 'axios';
import { baseURL } from '../App';

export const axiosInstance = axios.create();

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	console.log(
		'Processing queue:',
		failedQueue.length,
		'requests in the queue'
	);
	failedQueue.forEach((prom) => {
		if (error) {
			console.log('Rejecting request in queue with error:', error);
			prom.reject(error);
		} else {
			console.log('Resolving request in queue with new token:', token);
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

// Request Interceptor
axiosInstance.interceptors.request.use(
	function (config) {
		// console.log('Request Interceptor:', config.url);
		// Modify the request configuration if necessary
		return config;
	},
	function (error) {
		console.log('Request Interceptor caught an error: ' + error);
		return Promise.reject(error);
	}
);

// Response Interceptor
axiosInstance.interceptors.response.use(
	function (response) {
		// console.log('Response Interceptor (success):', response.config.url);
		return response;
	},
	function (error) {
		console.log('Full error object:', error); // Log the full error object

		// Check if the error is a 401
		if (error.response) {
			console.log('Response status:', error.response.status);
		} else {
			console.log('Error does not have a response property');
		}

		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			console.log('401 error detected, attempting to refresh token...');
			if (isRefreshing) {
				console.log(
					'Already refreshing token, adding request to queue...'
				);
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						console.log(
							'Retrying original request with new token:',
							token
						);
						originalRequest.headers['Authorization'] =
							'Bearer ' + token;
						return axiosInstance(originalRequest);
					})
					.catch((err) => {
						console.log('Error processing request queue:', err);
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			return new Promise(function (resolve, reject) {
				console.log('Refreshing token...');
				axios
					.get(`https://${baseURL}/api/auth/refresh`, {
						withCredentials: true,
					})
					.then(({ data }) => {
						const newAccessToken = data.accessToken;
						console.log(
							'Token refreshed successfully:',
							newAccessToken
						);

						// Update axios defaults and original request headers
						axiosInstance.defaults.headers.common['Authorization'] =
							'Bearer ' + newAccessToken;
						originalRequest.headers['Authorization'] =
							'Bearer ' + newAccessToken;

						// Process the queue
						processQueue(null, newAccessToken);

						// Retry the original request
						resolve(axiosInstance(originalRequest));
					})
					.catch((err) => {
						console.log('Token refresh failed:', err);
						processQueue(err, null);
						reject(err);
					})
					.finally(() => {
						console.log('Finished token refresh process');
						isRefreshing = false;
					});
			});
		}

		console.log(
			'Interceptor caught an error from the server:',
			error.response ? error.response.status : 'No response status'
		);
		return Promise.reject(error);
	}
);
