import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../utilities/redux/actions/user';

class SignInOut extends Component {
	constructor() {
		super();

		this.onLogin = this.onLogin.bind(this);
		this.onLogout = this.onLogout.bind(this);

		this.state = {
			email: '',
			password: ''
		};
	}
	onLogin(e) {
		e.preventDefault();
		let { email, password } = this.state;
		this.props.SignIn({ email, password });
	}
	onLogout() {
		this.props.SignOut();
	}
	onInput(field, value) {
		this.setState({ [field]: value });
	}
	render() {
		if (!this.props.isLoggedIn && !this.props.isLogIn)
			return (
				<div className="Row text-right">
					<div className="col">
						<span className="align-middle">
							<div>
								<span className="pr-4" onMouseEnter={this.props.onLogIn}>
									Log In
								</span>
								<Link to="/sign-up">
									<span onClick={this.onLogout}>Sign Up</span>
								</Link>
							</div>
						</span>
					</div>
				</div>
			);
		else if (!this.props.isLoggedIn && this.props.isLogIn)
			return (
				<div>
					<div className="row hidden-md-down justify-content-end pr-2">
						<form className="form-inline" onSubmit={this.onLogin}>
							<div className="col-5 mx-0 px-0">
								<input type="email" className="form-control" onChange={({ target }) => this.onInput('email', target.value)} placeholder="email" />
							</div>
							<div className="col-5 px-1">
								<input type="password" className="form-control" onChange={({ target }) => this.onInput('password', target.value)} placeholder="password" />
							</div>
							<div className="col-2 px-2">
								<button type="submit" className="btn btn-secondary">
									Log In
								</button>
							</div>
						</form>
					</div>
					<div className="Row hidden-lg-up justify-content-end">
						<div className="col text-right pr-0">
							<Link to="/sign-in">
								<span className="align-middle">Sign In</span>
							</Link>
						</div>
					</div>
				</div>
			);
		else
			return (
				<div className="Row text-right">
					<div className="col">
						<span className="align-middle">
							{this.props.isHover ? (
								<div>
									<span className="pr-4">Settings</span>
									<span onClick={this.onLogout}>Log Out</span>
								</div>
							) : (
								<span>{this.props.user.firstName + ' ' + this.props.user.lastName}</span>
							)}
						</span>
					</div>
				</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignInOut);
