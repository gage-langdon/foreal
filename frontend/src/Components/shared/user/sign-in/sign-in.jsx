import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../utilities/redux/actions/user';

class SignIn extends Component {
	constructor() {
		super();

		this.onLogin = this.onLogin.bind(this);

		this.state = {
			email: '',
			password: ''
		};
	}
	onLogin(e) {
		e.preventDefault();
		let { email, password } = this.state;
		console.log('login', email, password);
		console.log('props', this.props);

		this.props.SignIn({ email, password });
	}
	onInput(field, value) {
		this.setState({ [field]: value });
	}
	render() {
		return (
			<form onSubmit={this.onLogin}>
				<input type="email" onChange={({ target }) => this.onInput('email', target.value)} />
				<input type="password" onChange={({ target }) => this.onInput('password', target.value)} />
				<button type="submit" className="btn btn-primary">
					Log In
				</button>
			</form>
		);
	}
}
function mapStateToProps({ user }) {
	return {
		...user
	};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
