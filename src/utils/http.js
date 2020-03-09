import qs from 'qs';
import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(
	function(config) {
		// serialization data before post requeset
		if (config.method === 'post') {
			config.data = qs.stringify(config.data);
		}

		if (process.env.NODE_ENV !== 'production') {
		}else {
		}

		return config;
	},
	function(error) {
		console.log(error);
		return Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	function(response) {
		// Do something with response data
		return response;
	},
	function(error) {
		// Do something with response error
		return Promise.reject(error);
	}
);

export default axios;
