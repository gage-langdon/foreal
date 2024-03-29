import React, { Component } from 'react';
import FitText from 'react-fittext';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

// Components
import NewQuestion from '../../shared/new-question/new-question.jsx';

class SignUp extends Component {
	constructor() {
		super();

		this.oninput = this.oninput.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.isLoggedIn) {
			this.props.history.push({
				pathname: '/',
				state: {
					freshMeat: true
				}
			});
		}
	}
	oninput(field, value) {
		this.setState({ [field]: value });
	}
	onSubmit(e) {
		e.preventDefault();
		let { firstName, lastName, email, password } = this.state;
		this.props.SignUp({ email, password, firstName, lastName });
	}
	isValid() {
		let { firstName, lastName, email, password } = this.state;
		return firstName && lastName && email && password;
	}
	render() {
		let { isLoggedIn } = this.props;

		if (!isLoggedIn) {
			return (
				<div className="container pt-4">
					<div className="row justify-content-center">
						<div className="col-12 text-center">
							<FitText>
								<h1>Join Us</h1>
							</FitText>
						</div>
					</div>
					<form onSubmit={this.onSubmit}>
						<div className="row justify-content-center mt-4">
							<div className="col-12 col-md-4 col-lg-2 pr-md-1">
								<input
									type="text"
									placeholder="First Name"
									className="form-control my-1"
									onChange={({ target }) => this.oninput('firstName', target.value)}
								/>
							</div>
							<div className="col-12 col-md-4 col-lg-2 pl-md-0">
								<input
									type="text"
									placeholder="Last Name"
									className="form-control my-1"
									onChange={({ target }) => this.oninput('lastName', target.value)}
								/>
							</div>
						</div>
						<div className="row justify-content-center">
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
								<span style={{ color: '#ec6a6a' }}>{this.props.signUpError}</span>
							</div>
						</div>
						<div className="row justify-content-center mt-4">
							<div className="col-12 col-md-8 col-lg-4">
								<button
									type="submit"
									className={`btn ${this.isValid() ? 'btn-primary' : 'btn-secondary disabled'}`}
									style={{ width: '100%' }}
								>
									Get Answers
								</button>
							</div>
						</div>
						<div className="row justify-content-center mt-4">
							<div className="col-12 text-center">
								<Link to="sign-in">
									<span>Already a user?</span>
								</Link>
							</div>
						</div>
					</form>
				</div>
			);
		} else {
			return (
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 text-center">
							<h1>{`Hey ${this.props.user.firstName}!`}</h1>
							<h2 className="pt-2">Thank You For Joining Us!</h2>
						</div>
					</div>
					<div className="row justify-content-center pt-5">
						<div className="col-12 text-center">
							<Link to="/">Go home</Link>
						</div>
					</div>
				</div>
			);
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
