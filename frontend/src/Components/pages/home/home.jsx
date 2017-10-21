import React, { Component } from 'react';

// Components
import SignIn from '../../shared/user/sign-in/sign-in.jsx';

export default class Home extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col">home</div>
					<SignIn />
				</div>
			</div>
		);
	}
}
