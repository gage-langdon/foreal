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
	},
	getQuestions: token => {
		return axios.get('/user/questions', null, token);
	},
	getQuestionLoggedIn: (id, token) => {
		return axios.get(`/user/questions/${id}`, null, token);
	},
	getQuestion: id => {
		return axios.get(`/questions/${id}`);
	},
	getCurrentQuestionLoggedIn: token => {
		return axios.get('/user/questions/current', null, token);
	},
	submitResponse: (questionID, text) => {
		return axios.post('/anon/respond', { questionID, text });
	},
	deleteQuestion: (questionID, token) => {
		return axios.post('/user/questions/delete', { questionID }, token);
	}
};
