import axios from 'axios';
import Config from '../../config';

const instance = token => {
	let headers = {};
	if (token) headers['authorization'] = token ? 'Bearer ' + token : undefined;

	var item = axios.create({
		baseURL: Config.api,
		headers: headers,
		transformResponse: [
			function(data) {
				return data;
			}
		],
		validateStatus: function(status) {
			return status >= 200 && status < 300;
		}
	});
	return item;
};

export default {
	request(options, token) {
		return instance(token).request(options);
	}
};
