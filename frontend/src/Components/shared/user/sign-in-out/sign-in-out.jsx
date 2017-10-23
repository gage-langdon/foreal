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
		if (!this.props.isLoggedIn && this.props.signInError) {
			return (
				<div className="Row text-right">
					<div className="col">
						<span className="align-middle">
							{!this.state.sentReset ? (
								<div>
									<span>
										Incorrect password, send reset link?{' '}
										<span className="px-1" onClick={this.onSendReset} style={{ cursor: 'pointer' }}>
											Yes
										</span>
										<span className="px-1" onClick={this.cancelResetPassword} style={{ cursor: 'pointer' }}>
											No
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
		} else if (!this.props.isLoggedIn && !this.props.isLogIn) {
			return (
				<div className="Row text-right">
					<div className="col">
						<span className="align-middle">
							<div>
								<span className="pr-4" onMouseEnter={this.props.onLogIn}>
									Log In
								</span>
								<Link to="/sign-up" style={{ textDecoration: 'none', color: '#000000' }}>
									<span style={{ textDecoration: 'none', color: '#000000' }} onClick={this.onLogout}>
										Sign Up
									</span>
								</Link>
							</div>
						</span>
					</div>
				</div>
			);
		} else if (!this.props.isLoggedIn && this.props.isLogIn)
			return (
				<div>
					<div className="row hidden-md-down justify-content-end pr-2">
						<form className="form-inline" onSubmit={this.onLogin}>
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
							<div className="col-2 px-2">
								<button type="submit" className={`btn btn-secondary ${this.isValid() ? '' : 'disabled'}`}>
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
									<span className="pr-4" style={{ cursor: 'pointer' }}>
										Settings
									</span>
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
