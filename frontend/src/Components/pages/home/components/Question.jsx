import React, { Component } from 'react';
import FitText from 'react-fittext';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../utilities/redux/actions/user';

// Components
import Loading from '../../../shared/Loading.jsx';
import Share from '../../../shared/share';

class Question extends Component {
	constructor() {
		super();

		this.onRefresh = this.onRefresh.bind(this);
		this.onIsLoading = this.onIsLoading.bind(this);
		this.onDelete = this.onDelete.bind(this);

		this.state = {
			responseHovering: '',
			isLoading: false,
			isDeleting: false,
			isDeleteConfirm: false,
			isHeaderHover: false
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
	async onDelete() {
		try {
			this.setState({ isDeleting: true });
			await this.props.DeleteQuestion(this.props.question._id);
			await this.props.GetQuestions();
		} catch (err) {
			this.setState({ isDeleting: false });
		}
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
					className="col-12 pt-3 pb-1 px-0"
					onMouseEnter={() => this.setResponseHover(response._id)}
					onMouseLeave={() => this.setResponseHover('')}
				>
					<div className="row">
						<div className="col-12 text-left pb-1" style={{ wordWrap: 'break-word', fontFamily: 'Droid Serif, Serif' }}>
							<span>{response.text}</span>
						</div>
						{/* <div className="col-1 pl-0  align-self-end">
							{isActive ? <span className="py-auto my-auto">{toDate(response.dateCreated)}</span> : null}
						</div> */}
					</div>
				</div>
			);
		});

		if (this.props.isLoggedIn) {
			return (
				<div className="container-fluid">
					<div className="row align-items-center justify-content-center">
						<div className="col-12 px-0 col-xl-8 pt-1">
							<div
								className="jumbotron py-3"
								style={{
									backgroundColor: '#ffffff',
									border: 'solid #e6f2ff 1px'
								}}
							>
								<div className="container">
									<div
										className="row justify-content-center"
										onMouseEnter={() => this.setState({ isHeaderHover: true })}
										onMouseLeave={() => this.setState({ isHeaderHover: false })}
									>
										{/* <div className="col-1 pr-0"> */}
										{/* <button className="btn btn-secondary" onClick={this.onRefresh}>
												<i className="material-icons align-middle">
													{this.state.isLoading ? <Loading isLoading={this.state.isLoading} /> : 'refresh'}
												</i>
											</button> */}
										{/* </div> */}
										<div className="col-10 text-left px-0" style={{ fontFamily: 'Roboto, San-Serif' }}>
											{question ? (
												<FitText compressor={1.5}>
													<h2>{question.text}</h2>
												</FitText>
											) : (
												<Loading isLoading={true} />
											)}
										</div>
										<div className="col-2 text-right pl-0">
											{true || this.state.isHeaderHover || this.state.isDeleting ? (
												<div className="row pl-0 align-middle">
													<div className="col-12 pr-0">
														{/* <button
															className={`btn btn-secondary ${this.state.isDeleting ? 'disabled' : ''}`}
															onClick={this.onDelete}
														> */}
														{this.state.isDeleteConfirm ? (
															<div className="pt-lg-2" onClick={this.onDelete}>
																<span style={{ color: 'red', cursor: 'pointer' }}>Delete?</span>
															</div>
														) : (
															<div onClick={() => this.setState({ isDeleteConfirm: true })}>
																{/* {this.state.isDeleting ? (
																<Loading color="red" />
															) : ( */}
																<i
																	className="material-icons py-md-1 py-lg-2"
																	style={{ color: 'rgba(0,0,0,.25)', cursor: 'pointer' }}
																>
																	delete
																</i>
																{/* )} */}
															</div>
														)}
														{/* </button> */}
													</div>
													{/* <div className="col pt-3 text-center">
													{toDate(question.dateCreated)}
												</div> */}
												</div>
											) : null}
										</div>
										{/* <div className="col-12 px-0">
											<hr />
										</div> */}
									</div>
									<div className="row justify-content-center">
										<div className="col-12 px-1">
											<Share title={question.text} path={question._id} description={'Anonymous Answers For Real Questions'} />
										</div>
									</div>
									<div className="row justify-content-center">
										<div className="col-12 px-0">
											<hr style={{ border: 'solid #e6f2ff 1px' }} />
										</div>
										{!Responses || Responses.length < 1 ? <div className="pt-1">No Responses Yet :(</div> : Responses}
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
