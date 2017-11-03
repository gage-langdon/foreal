import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import SignInOut from '../user/sign-in-out/sign-in-out.jsx';

class NavBar extends Component {
	constructor() {
		super();

		this.onLogIn = this.onLogIn.bind(this);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);

		this.state = {
			isHover: false,
			isLogIn: false
		};
	}
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}
	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}
	setWrapperRef(node) {
		this.wrapperRef = node;
	}
	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.onHover(false);
		}
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
			<div className="container-fluid pb-3" onMouseEnter={() => this.onHover(true)} ref={this.setWrapperRef}>
				<div className="row justify-content-center">
					<div className="col">
						<nav className="navbar navbar-light">
							<div className="row pt-2">
								<div className="col pl-0">
									<NavLink to="/">
										<span className="navbar-brand">Foreal.io</span>
									</NavLink>
								</div>
								<div className="col pr-0 pt-2">
									<SignInOut
										isHover={this.state.isHover}
										isLogIn={this.state.isLogIn}
										onLogIn={this.onLogIn}
										location={this.props.location.pathname}
									/>
								</div>
							</div>
						</nav>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(NavBar);
