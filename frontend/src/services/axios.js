import AxiosLib from './lib/axios';

const _request = (method, url, data, token) => {
	let options = {
		method: method,
		url: url,
		responseType: 'json',
		withCredentials: true
	};
	if (data && method === 'GET') {
		options.params = data;
	} else if (data) {
		options.data = data;
		options.headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		};
	}

	return new Promise((resolve, reject) => {
		AxiosLib.request(options, token)
			.then(response => {
				let data = response.data;
				if (typeof data !== 'object') data = JSON.parse(data);
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const DataAccessService = {
	get(url, data, token) {
		return _request('GET', url, data, token);
	},
	post(url, data, token) {
		return _request('POST', url, data, token);
	},
	delete(url, token) {
		return _request('DELETE', url, token);
	}
};

export default DataAccessService;
