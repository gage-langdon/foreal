import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

class SignUp extends Component {
	constructor() {
		super();

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		};
	}

	render() {
		console.log(this.props);
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
									<form>
										<div className="row justify-content-center mt-4">
											<div className="col-2 pr-1">
												<input type="text" placeholder="First Name" className="form-control my-1" />
											</div>
											<div className="col-2 pl-0">
												<input type="text" placeholder="Last Name" className="form-control my-1" />
											</div>
										</div>
										<div className="row justify-content-center">
											<div className="col-4 text-center">
												<input type="email" placeholder="Email" className="form-control my-1" />
												<input type="password" placeholder="Password" className="form-control my-1" />
											</div>
										</div>
										<div className="row justify-content-center mt-4">
											<div className="col-4">
												<button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
													Submit
												</button>
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
										<div className="col-4 text-center">
											<Link to="/">
												<button className="btn btn-secondary">Get Answers</button>
											</Link>
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
