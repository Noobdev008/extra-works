import axios from 'axios';
import { getToken } from './token';

let config = {};

export let http = {};

const bootstrap = () => {
	http = axios.create({
		baseURL: config.apiBaseUrl,
		timeout: 30000,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});

	http.interceptors.request.use(config => {
		if (config.setAuthHeader) {
			const token = getToken();
			config.headers.common['Authorization'] = `${token}`;
		}
		return config;
	});
};

export const initializeHttp = appConfig => {
	config = appConfig;
	bootstrap();
};
