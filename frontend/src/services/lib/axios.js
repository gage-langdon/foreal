import axios from 'axios';
import Config from '../../config';

const instance = token => {
	var item = axios.create({
		baseURL: Config.api,
		headers: {
			Authorization: token
		},
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
