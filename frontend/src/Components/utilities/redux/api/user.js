import axios from '../../../../services/axios';

export default {
	login: ({ email, password }) => {
		return axios.post('/login', { email, password });
	},
	signup: ({ email, password, firstName, lastName, notificationOK }) => {
		return axios.post('/sign-up', { email, password, firstName, lastName, notificationOK });
	},
	createQuestion: ({ text }, token) => {
		return axios.post('/user/questions/create', { text }, token);
	}
};
