import Types from '../constants/user';

const initialState = {
	isLoggedIn: localStorage.getItem('user') ? true : false,
	user: JSON.parse(localStorage.getItem('user')) || {},
	currentQuestion: null,
	questions: [],
	responses: [],
	signInError: '',
	signUpError: ''
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case Types.LOG_IN:
			if (action.payload.signInError) return { ...state, signInError: action.payload.signInError };
			else if (action.payload.signUpError) return { ...state, signUpError: action.payload.signUpError };
			else {
				let user = { ...action.payload.user, token: action.payload.token };
				localStorage.setItem('user', JSON.stringify(user));
				return { ...state, user, isLoggedIn: true };
			}
		case Types.LOG_OUT:
			localStorage.removeItem('user');
			return { ...initialState, user: {}, isLoggedIn: false, questions: [], responses: [] };
		case Types.SET_SIGNIN_ERROR:
			return { ...state, signInError: action.payload };
		case Types.UPDATE_QUESTIONS:
			return { ...state, questions: action.payload };
		case Types.UPDATE_CURRENT_QUESTION:
			return { ...state, currentQuestion: action.payload };
		default:
			return state;
	}
}
