import React, { Component } from 'react';
import FitText from 'react-fittext';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

// Components
import Wrapper from '../../shared/page-wrapper/page-wrapper.jsx';
import NewQuestion from '../../shared/new-question/new-question.jsx';
import Loading from '../../shared/Loading.jsx';

const RESP_LIMIT = 1500;

class Response extends Component {
	constructor() {
		super();

		this.sendResponse = this.sendResponse.bind(this);

		this.state = {
			question: null,
			responseText: '',
			errorMsg: '',
			successMsg: '',
			isReplying: false
		};
	}
	componentWillMount() {
		this.getQuestion();
	}
	async getQuestion() {
		let { questionId } = this.props.match.params;
		let question = await this.props.GetQuestion(questionId);
		this.setState({ question });
	}
	async sendResponse(e) {
		e.preventDefault();
		let { question, responseText } = this.state;
		try {
			if (!question || !responseText) return;
			this.setState({ isReplying: true });
			await this.props.SubmitResponse(question._id, responseText);
			this.setState({ successMsg: 'Thank you for responding!', isReplying: false });
		} catch (err) {
			this.setState({ errorMsg: 'Failed to submit response, try again?', isReplying: false });
		}
	}
	onEnterResponseText(text) {
		if (text.length > RESP_LIMIT) return;
		const formatted = text.charAt(0).toUpperCase() + text.slice(1);
		this.setState({ responseText: formatted });
	}
	render() {
		let { question } = this.state;

		if (this.state.successMsg) {
			return (
				<div className="row">
					<div className="col-12">
						<div className="row justify-content-center">
							<div className="col-12 col-md-6 text-center">
								<h1>{this.state.successMsg}</h1>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-12 col-md-6 text-center pt-4">
								<Link to="/">
									<button className="btn btn-secondary">
										<h2>Ask your own question</h2>
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			);
		} else if (question)
			return (
				<div className="container">
					<div className="row justify-content-center pt-4">
						<div className="col-12 text-center">
							<h1>{`${question.user.firstName} ${question.user.lastName} wants to know:`}</h1>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-12 text-center">
							<h3 className="pt-4">{question.text}</h3>
						</div>
					</div>
					<div className="row justify-content-center pt-4">
						<div className="col-12 col-md-8 col-lg-6 col-xl-4 pt-5 text-center">
							<form onSubmit={this.sendResponse}>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										placeholder="Type your response here..."
										onChange={({ target }) => this.onEnterResponseText(target.value)}
										value={this.state.responseText}
									/>
									<div className="input-group-btn">
										<button type="submit" className={`btn btn-secondary ${this.state.isReplying ? 'disabled' : ''}`}>
											{this.state.isReplying ? <Loading /> : 'Reply'}
										</button>
									</div>
								</div>
							</form>
						</div>
						<div className="col-12">
							<div className="row justify-content-center">
								<div className="col-12 col-md-8 col-lg-6 col-xl-4 text-right">
									{this.state.responseText.length > 1200 ? this.state.responseText.length + '/' + RESP_LIMIT : null}
								</div>
							</div>
						</div>
						<div className="col-12 text-center">{this.state.errorMsg}</div>
						<div className="col-12 pt-5 text-center">{`Respond honestly. ${question.user.firstName} won't know who replied`}</div>
					</div>
				</div>
			);
		else
			return (
				<div className="row justify-content-center">
					<div className="col-1">
						<Loading />
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
