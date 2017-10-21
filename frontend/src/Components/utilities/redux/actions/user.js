import Types from '../constants/user';
import API from '../api/user';

export function SignIn({ email, password }) {
	return async (dispatch, getState) => {
		console.log('login');
		let user = await API.login({ email, password });
		console.log('user', user);
		dispatch({ type: Types.LOG_IN, payload: user });
	};
}
export function SignUp({ email, password, firstName, lastName, notificationOK }) {
	return async (dispatch, getState) => {
		let user = await API.signup({ email, password, firstName, lastName, notificationOK });
		dispatch({ type: Types.LOG_IN, payload: user });
	};
}
