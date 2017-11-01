import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

// Components
import NewQuestion from '../../shared/new-question/new-question.jsx';

class Response extends Component {
	constructor() {
		super();

		this.sendResponse = this.sendResponse.bind(this);

		this.state = {
			question: null,
			responseText: '',
			errorMsg: '',
			successMsg: ''
		};
	}
	componentWillMount() {
		this.getQuestion();
	}
	async getQuestion() {
		let { questionId } = this.props.match.params;
		let question = await this.props.GetQuestion(questionId);
		console.log('question', question);
		this.setState({ question });
	}
	async sendResponse(e) {
		e.preventDefault();
		let { question, responseText } = this.state;
		try {
			if (!question || !responseText) return;
			await this.props.SubmitResponse(question._id, responseText);
			this.setState({ successMsg: 'Thank you for responding!' });
		} catch (err) {
			console.log(err);
			this.setState({ errorMsg: 'Failed to submit response' });
		}
	}
	render() {
		let { question } = this.state;
		return (
			<div className="container-fluid" style={{ minHeight: '100%', minWidth: '100%', position: 'absolute' }}>
				<div className="row align-items-center justify-content-center" style={{ minHeight: '100%', minWidth: '100%', position: 'absolute' }}>
					<div className="col pt-5 px-5" style={{ minHeight: '100%', position: 'absolute', overflowY: 'hidden' }}>
						<div
							className="jumbotron"
							style={{
								minHeight: '80%',
								minWidth: '95.5%',
								position: 'absolute',
								backgroundColor: '#ffffff',
								border: 'solid #e6f2ff 1px'
							}}
						>
							{question ? (
								<div className="container">
									<div className="row justify-content-center">
										<div className="col-12 text-center">
											<h2>{`${question.user.firstName} ${question.user.lastName} wants to know:`}</h2>
										</div>
										<div className="col-12 text-center">
											<h1 className="pt-4">{question.text}</h1>
										</div>
										{!this.state.successMsg ? (
											<div className="col-6 pt-5 text-center">
												<form>
													<div className="input-group">
														<input
															type="text"
															className="form-control"
															placeholder=""
															onChange={({ target }) => this.setState({ responseText: target.value })}
															value={this.state.responseText}
														/>
														<div className="input-group-btn">
															<button type="submit" className="btn btn-secondary" onClick={this.sendResponse}>
																Reply
															</button>
														</div>
													</div>
												</form>
											</div>
										) : null}
										<div className="col-12 text-center">{this.state.errorMsg}</div>

										<div className="col-12 pt-5 text-center">
											{`Respond honestly. ${question.user.firstName} won't know who replied`}
										</div>
									</div>
								</div>
							) : (
								<div className="container">
									<div className="row">
										<div className="col text-center">
											<span>Loading...</span>
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
export default connect(mapStateToProps, mapDispatchToProps)(Response);
