import React, { Component } from 'react';
import { Route } from 'react-router';

// Pages
import Home from '../pages/home/home.jsx';
import Response from '../pages/response/response.jsx';

export default class Routes extends Component {
	render() {
		return (
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/:questionId" component={Response} />
			</div>
		);
	}
}
