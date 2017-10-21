import axios from '../../../../services/axios';

export default {
	login: ({ email, password }) => {
		return axios.post('/login', { email, password });
	},
	signup: ({ email, password, firstName, lastName, notificationOK }) => {
		return axios.post('/signup', { email, password, firstName, lastName, notificationOK });
	}
};
