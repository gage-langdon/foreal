import Types from '../constants/user';
import API from '../api/user';

export function SignIn({ email, password }) {
	return async (dispatch, getState) => {
		try {
			let user = await API.login({ email, password });
			dispatch({ type: Types.LOG_IN, payload: user });
		} catch (err) {
			console.log('login error', err);
		}
	};
}
export function SignUp({ email, password, firstName, lastName, notificationOK }) {
	return async (dispatch, getState) => {
		let user = await API.signup({ email, password, firstName, lastName, notificationOK });
		dispatch({ type: Types.LOG_IN, payload: user });
	};
}
export function SignOut() {
	return { type: Types.LOG_OUT };
}
export function holdQuestion(text) {
	console.log('hold question', text);
}
export function CreateQuestion(text) {
	return async (dispatch, getState) => {
		console.log('create question', text);
	};
}
