import Types from '../constants/user';
import API from '../api/user';

export function SignIn({ email, password }) {
	return async (dispatch, getState) => {
		try {
			if (email && password) {
				let user = await API.login({ email, password });
				dispatch({ type: Types.LOG_IN, payload: user, signInError: '' });
			}
		} catch (err) {
			dispatch({ type: Types.LOG_IN, payload: { signInError: 'Invalid Username or Password' } });
		}
	};
}
export function SignUp({ email, password, firstName, lastName, notificationOK = true }) {
	return async (dispatch, getState) => {
		try {
			if (!email || !password || !firstName || !lastName)
				dispatch({ type: Types.LOG_IN, payload: { signUpError: 'Looks like you forgot to enter all the information' } });
			else {
				let user = await API.signup({ email, password, firstName, lastName, notificationOK });
				dispatch({ type: Types.LOG_IN, payload: user, signUpError: '' });
			}
		} catch (err) {
			dispatch({ type: Types.LOG_IN, payload: { signUpError: 'An account is already registered with that email' } });
		}
	};
}
export function ClearSignInError() {
	return { type: Types.SET_SIGNIN_ERROR, payload: '' };
}
export function SignOut() {
	return { type: Types.LOG_OUT };
}
export function CreateQuestion(text) {
	return async (dispatch, getState) => {
		let state = getState().user;
		if (state.isLoggedIn) {
			let { token } = state.user;
			await API.createQuestion({ text }, token);
		} else {
			console.log('error on create question: not logged in');
		}
	};
}
export function GetQuestion(id) {
	return async (dispatch, getState) => {
		let state = getState().user;
		if (state.user && state.user.token) {
			let { question } = await API.getQuestionLoggedIn(id, state.user.token);
			return question;
		} else {
			let { question } = await API.getQuestion(id);
			return question;
		}
	};
}
export function GetQuestions() {
	return async (dispatch, getState) => {
		let { user } = getState().user;
		let token = user.token;
		let { questions } = await API.getQuestions(token);
		dispatch({ type: Types.UPDATE_QUESTIONS, payload: questions });
	};
}
export function SubmitResponse(questionID, text) {
	return async () => {
		return await API.submitResponse(questionID, text);
	};
}
export function DeleteQuestion(questionID) {
	return async (dispatch, getState) => {
		if(!questionID) return;
		let { user } = getState().user;
		let token = user.token;
		return await API.deleteQuestion(questionID, token);
	};
}
