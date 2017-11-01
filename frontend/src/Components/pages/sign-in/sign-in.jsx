import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import FitText from 'react-fittext';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

class SignIn extends Component {
	constructor() {
		super();

		this.oninput = this.oninput.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			email: '',
			password: '',
			isSigningIn: false
		};
	}
	oninput(field, value) {
		this.setState({ [field]: value });
	}
	async onSubmit(e) {
		e.preventDefault();
		let { email, password } = this.state;
		try {
			this.setState({ isSigningIn: true });
			await this.props.SignIn({ email, password });
			this.setState({ isSigningIn: false });
		} catch (err) {
			this.setState({ isSigningIn: false });
		}
	}
	isValid() {
		let { email, password } = this.state;
		return email && password;
	}
	render() {
		let { isLoggedIn, signInError } = this.props;

		if (!isLoggedIn) {
			return (
				<div className="container pt-4">
					<div className="row justify-content-center">
						<div className="col-12 text-center">
							<FitText>
								<h1>Sign In</h1>
							</FitText>
						</div>
					</div>
					<form onSubmit={this.onSubmit}>
						<div className="row justify-content-center pt-4">
							<div className="col-12 col-md-8 col-lg-4 text-center">
								<input
									type="email"
									placeholder="Email"
									className="form-control my-1"
									onChange={({ target }) => this.oninput('email', target.value)}
								/>
								<input
									type="password"
									placeholder="Password"
									className="form-control my-1"
									onChange={({ target }) => this.oninput('password', target.value)}
								/>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-12 col-md-8 col-lg-4 text-center">
								<span style={{ color: '#ec6a6a' }}>{this.props.signInError}</span>
							</div>
						</div>
						<div className="row justify-content-center mt-4">
							<div className="col-12 col-md-8 col-lg-4">
								<button
									type="submit"
									className={`btn ${this.isValid() ? 'btn-primary' : 'btn-secondary disabled'}`}
									style={{ width: '100%' }}
								>
									Sign In
								</button>
							</div>
						</div>
						<div className="row justify-content-center mt-4">
							<div className="col-12 text-center">
								<Link to="sign-up">
									<span>Not a user yet?</span>
								</Link>
							</div>
						</div>
					</form>
				</div>
			);
		} else if (isLoggedIn) {
			return <Redirect to="/" />;
		}
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
