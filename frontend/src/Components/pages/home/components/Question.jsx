import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../utilities/redux/actions/user';

// Components
import Loading from '../../../shared/Loading.jsx';

class Question extends Component {
	constructor() {
		super();

		this.onRefresh = this.onRefresh.bind(this);
		this.onIsLoading = this.onIsLoading.bind(this);

		this.state = {
			responseHovering: '',
			isLoading: false
		};
	}
	setResponseHover(responseID) {
		this.setState({ responseHovering: responseID });
	}
	async onRefresh() {
		this.onIsLoading(true);
		await this.props.onRefresh();
		setTimeout(() => {
			this.onIsLoading(false);
		}, 700);
	}
	onIsLoading(isLoading) {
		this.setState({ isLoading });
	}
	render() {
		let { question } = this.props;
		if (!question) return null;

		const toDate = dateObj => {
			let date = new Date(dateObj);
			return `${parseInt(date.getMonth().toLocaleString()) + 1}/${date.getDate().toLocaleString()}/${date
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
					{isActive ? <p className="pt-3 text-right">{toDate(response.dateCreated)}</p> : null}
				</div>
			);
		});

		if (this.props.isLoggedIn) {
			return (
				<div className="container-fluid">
					<div className="row align-items-center justify-content-center">
						<div className="col pt-1 px-5">
							<div className="jumbotron py-3" style={{ backgroundColor: '#ffffff', border: 'solid #e6f2ff 1px' }}>
								<div className="container">
									<div className="row justify-content-center">
										<div className="col-1">
											{/* <button className="btn btn-secondary" onClick={this.onRefresh}>
												<i className="material-icons align-middle">
													{this.state.isLoading ? <Loading isLoading={this.state.isLoading} /> : 'refresh'}
												</i>
											</button> */}
										</div>
										<div className="col-10 text-center">{question ? <h1>{question.text}</h1> : <Loading isLoading={true} />}</div>
										<div className="col-1 text-right pl-0">
											{/* <button className="btn btn-secondary" onClick={this.onToggleModal}>
													Share
												</button> */}
										</div>
										<div className="col-12 px-0">
											<hr />
										</div>
										<div className="px-0 pt-0 pb-2 text-center">
											<h5>Share this link to get responses: {`foreal.io/${question._id}`}</h5>
										</div>
									</div>

									<div className="row justify-content-center">
										{!Responses || Responses.length < 1 ? <div className="pt-4 pb-2">No Responses Yet :(</div>  : Responses}
									</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Question);
