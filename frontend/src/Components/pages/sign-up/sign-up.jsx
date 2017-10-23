import React, { Component } from 'react';

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
		return (
			<div className="container-fluid" style={{ minHeight: '100%', minWidth: '100%', position: 'absolute' }}>
				<div className="row align-items-center justify-content-center" style={{ minHeight: '100%', minWidth: '100%', position: 'absolute' }}>
					<div className="col pt-5 px-5" style={{ minHeight: '100%', position: 'absolute', overflowY: 'hidden' }}>
						<div className="jumbotron" style={{ minHeight: '80%', minWidth: '95.5%', position: 'absolute', backgroundColor: '#ffffff', border: 'solid #e6f2ff 1px' }}>
							{!this.props.isLoggedIn ? (
								<div className="container">
									<div className="row justify-content-center">
										<div className="col-12 text-center">
											<h1>Thank you for signing up!</h1>
										</div>
									</div>
									<form onSubmit={this.onSubmit}>
										<div className="row justify-content-center mt-4">
											<div className="col-2 pr-1">
												<input
													type="text"
													placeholder="First Name"
													className="form-control my-1"
													onChange={({ target }) => this.oninput('firstName', target.value)}
												/>
											</div>
											<div className="col-2 pl-0">
												<input
													type="text"
													placeholder="Last Name"
													className="form-control my-1"
													onChange={({ target }) => this.oninput('lastName', target.value)}
												/>
											</div>
										</div>
										<div className="row justify-content-center">
											<div className="col-4 text-center">
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
										<div className="row justify-content-center mt-4">
											<div className="col-4">
												<button type="submit" className={`btn btn-secondary ${this.isValid() ? '' : 'disabled'}`} style={{ width: '100%' }}>
													Get Answers
												</button>
											</div>
										</div>
										<div className="row justify-content-center mt-4">
											<div className="col-4 text-center">
												<span>{this.props.signUpError}</span>
											</div>
										</div>
									</form>
								</div>
							) : (
								<div className="container">
									<div className="row justify-content-center">
										<div className="col-12 text-center">
											<h1>{`Hey ${this.props.user.firstName}!`}</h1>
											<h2 className="pt-2">Thank You For Joining Us!</h2>
										</div>
									</div>
									<div className="row justify-content-center pt-5">
										<div className="col-12 text-center">
											<NewQuestion />
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
