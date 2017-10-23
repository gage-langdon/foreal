import React, { Component } from 'react';
import { Route } from 'react-router';

// Pages
import Home from '../pages/home/home.jsx';
import Response from '../pages/response/response.jsx';
import SignUp from '../pages/sign-up/sign-up.jsx';

export default class Routes extends Component {
	render() {
		return (
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/sign-up" component={SignUp} />
				<Route exact path="/:questionId" component={Response} />
			</div>
		);
	}
}
