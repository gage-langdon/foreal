import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../utilities/redux/actions/user';

// Components
//import Question from '../../../shared/question/question.jsx';

class CurrentQuestion extends Component {
	constructor() {
		super();

		this.onRefresh = this.onRefresh.bind(this);

		this.state = {
			responseHovering: ''
		};
	}
	setResponseHover(responseID) {
		this.setState({ responseHovering: responseID });
	}
	onRefresh() {
		this.props.onRefresh();
	}
	render() {
		let { question } = this.props;
		const toDate = dateObj => {
			let date = new Date(dateObj);
			return `${date.getMonth().toLocaleString()}/${date.getDate().toLocaleString()}/${date
				.getFullYear()
				.toLocaleString()
				.substr(3, 2)}`;
		};
		let Responses = question.responses.map((response, i) => {
			let isActive = this.state.responseHovering === response._id;
			return (
				<div
					key={response._id}
					className="col-12 pt-3 pb-1"
					style={{ backgroundColor: `${i % 2 > 0 ? '#ffffff' : '#e6f2ff'}` }}
					onMouseEnter={() => this.setResponseHover(response._id)}
				>
					<p className={`my-auto ${!isActive ? 'pb-3' : ''} mr-0`}>
						<b>{response.text}</b>
					</p>
					{isActive ? <p className="pt-3 text-right">{toDate(question.dateCreated)}</p> : null}
				</div>
			);
		});

		if (this.props.isLoggedIn) {
			return (
				<div className="container-fluid">
					<div className="row align-items-center justify-content-center">
						<div className="col pt-5 px-5">
							<div className="jumbotron" style={{ backgroundColor: '#ffffff', border: 'solid #e6f2ff 1px' }}>
								<div className="container" style={{ height: '70vh' }}>
									<div className="row justify-content-center">
										<div className="col-1 text-left pl-0">
											<button className="btn btn-secondary" onClick={this.onRefresh}>
												<i className="material-icons align-middle">refresh</i>
											</button>
										</div>
										<div className="col-10 text-center">
											<h1>Your Currently Asked Question</h1>
										</div>
										<div className="col-1 text-right pr-0">
											<button className="btn btn-secondary">New</button>
										</div>
										<div className="col-12 px-0">
											<hr />
										</div>
									</div>
									<div className="row justify-content-center pt-4 pb-2">
										<div className="col-12 pl-0">
											<h2 className="">{question.text}</h2>
										</div>
									</div>
									<div className="row justify-content-center">{Responses}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return <div>You must be logged in</div>;
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
export default connect(mapStateToProps, mapDispatchToProps)(CurrentQuestion);
