import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SignInOut from '../user/sign-in-out/sign-in-out.jsx';

export default class NavBar extends Component {
	constructor() {
		super();

		this.onLogIn = this.onLogIn.bind(this);

		this.state = {
			isHover: false,
			isLogIn: false
		};
	}
	onHover(isHover) {
		if (isHover) this.setState({ isHover });
		else this.setState({ isHover, isLogIn: false });
	}
	onLogIn() {
		this.setState({ isLogIn: true });
	}
	render() {
		return (
			<div className="container-fluid mb-2">
				<div className="row" onMouseEnter={() => this.onHover(true)} onMouseLeave={() => this.onHover(false)}>
					<div className="col">
						<nav className="navbar navbar-light">
							<div className="row pt-2">
								<div className="col pl-0">
									<NavLink to="/">
										<span className="navbar-brand">Foreal.io</span>
									</NavLink>
								</div>
								<div className="col pr-0 pt-2">
									<SignInOut isHover={this.state.isHover} isLogIn={this.state.isLogIn} onLogIn={this.onLogIn} />
								</div>
							</div>
						</nav>
					</div>
				</div>
			</div>
		);
	}
}
