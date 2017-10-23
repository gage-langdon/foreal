import Types from '../constants/user';

const initialState = {
	isLoggedIn: localStorage.getItem('user') ? true : false,
	user: JSON.parse(localStorage.getItem('user')) || {},
	questions: [],
	responses: []
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case Types.LOG_IN:
			let user = { ...action.payload.user, token: action.payload.token };
			localStorage.setItem('user', JSON.stringify(user));
			return { ...state, user, isLoggedIn: true };
		case Types.LOG_OUT:
			localStorage.removeItem('user');
			return { ...state, user: {}, isLoggedIn: false };
		default:
			return state;
	}
}
