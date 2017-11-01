import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../utilities/redux/actions/user';

class SignInOut extends Component {
	constructor() {
		super();

		this.onLogin = this.onLogin.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onSendReset = this.onSendReset.bind(this);
		this.cancelResetPassword = this.cancelResetPassword.bind(this);

		this.state = {
			email: '',
			password: '',
			sentReset: false
		};
	}
	componentWillReceiveProps(nextProps) {}
	onLogin(e) {
		e.preventDefault();
		if (this.isValid()) {
			let { email, password } = this.state;
			this.props.SignIn({ email, password });
			this.setState({ email: '', password: '' });
		}
	}
	onLogout() {
		this.props.SignOut();
	}
	onInput(field, value) {
		this.setState({ [field]: value });
	}
	isValid() {
		let { email, password } = this.state;
		return email && password;
	}
	onSendReset() {
		this.setState({ sentReset: true });
	}
	cancelResetPassword() {
		this.setState({ sentReset: false });
		this.props.ClearSignInError();
	}
	render() {
		const { isLoggedIn, isLogIn, signInError, location } = this.props;

		if (!isLoggedIn && signInError && location !== '/sign-in') {
			return (
				<div className="Row text-right">
					<div className="col pr-0">
						<span className="align-middle">
							{!this.state.sentReset ? (
								<div>
									<span style={{ color: '#ec6a6a' }}>
										{/* Incorrect password, send reset link?{' '}
										<span className="px-2" onClick={this.onSendReset} style={{ cursor: 'pointer' }}>
											Yes
										</span> */}
										<span className="pl-2 pr-0" onClick={this.cancelResetPassword} style={{ cursor: 'pointer' }}>
											{/* No */}Incorrect Password, try again?
										</span>
									</span>
								</div>
							) : (
								<div style={{ cursor: 'pointer' }}>
									<span onClick={this.cancelResetPassword}>Sent you an email, retry?</span>
								</div>
							)}
						</span>
					</div>
				</div>
			);
		} else if (!isLoggedIn && !isLogIn) {
			return (
				<div className="Row text-right">
					<div className="col pr-1">
						<span className="align-middle">
							<div>
								<span className="pr-4 hidden-md-down" onMouseEnter={this.props.onLogIn}>
									Log In
								</span>
								<NavLink className="hidden-lg-up pr-4" exact to="/sign-in" style={{ textDecoration: 'none', color: '#000000' }}>
									<span onClick={this.onLogout}>Sign In</span>
								</NavLink>
								<NavLink exact to="/sign-up" style={{ textDecoration: 'none', color: '#000000' }}>
									<span onClick={this.onLogout}>Join</span>
								</NavLink>
							</div>
						</span>
					</div>
				</div>
			);
		} else if (!isLoggedIn && isLogIn)
			return (
				<form className="form" onSubmit={this.onLogin}>
					<div className="row justify-content-end pr-4">
						<div className="col-5 mx-0 px-0">
							<input
								type="email"
								className="form-control"
								onChange={({ target }) => this.onInput('email', target.value)}
								placeholder="email"
								value={this.state.email}
							/>
						</div>
						<div className="col-5 px-1">
							<input
								type="password"
								className="form-control"
								onChange={({ target }) => this.onInput('password', target.value)}
								placeholder="password"
								value={this.state.password}
							/>
						</div>
						<div className="col-1 pl-0">
							<button type="submit" className={`btn btn-secondary ${this.isValid() ? '' : 'disabled'}`}>
								Log In
							</button>
						</div>
					</div>
				</form>
			);
		else
			return (
				<div className="Row text-right">
					<div className="col pr-0">
						<span className="align-middle">
							{this.props.isHover ? (
								<div>
									{/* <span className="pr-4" style={{ cursor: 'pointer' }}>
										Settings
									</span> */}
									<span onClick={this.onLogout} style={{ cursor: 'pointer' }}>
										Log Out
									</span>
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
