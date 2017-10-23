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
			let questions = await API.createQuestion({ text }, token);
			dispatch({ type: Types.SET_NEW_QUESTION, payload: questions });
		} else {
			console.log('error on create question: not logged in');
		}
	};
}
