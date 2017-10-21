import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
	render() {
		return (
			<div className="row">
				<div className="col">
					<nav className="navbar navbar-light bg-faded">
						<Link to="/">
							<span className="navbar-brand">Foreal</span>
						</Link>
					</nav>
				</div>
			</div>
		);
	}
}
