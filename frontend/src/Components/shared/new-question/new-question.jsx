import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

// components
import Loading from '../Loading.jsx';

class NewQuestion extends Component {
	constructor() {
		super();

		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			question: '',
			isLoading: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.preLoadedQuestion) this.setState({ question: nextProps.preLoadedQuestion });
	}
	oninput(fieldName, value) {
		this.setState({ [fieldName]: value });
	}
	async onSubmit(e) {
		e.preventDefault();
		try {
			if (this.state.question) {
				this.onLoading(true);
				let newQuestion = await this.props.CreateQuestion(this.state.question);
				await this.props.GetQuestions();
				this.setState({ question: '' });
				this.onLoading(false);
				if (this.props.onNewQuestion) {
					this.props.onNewQuestion(newQuestion);
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
	onLoading(isLoading) {
		if (this.props.onLoading) this.props.onLoading(isLoading);
		this.setState({ isLoading });
	}
	render() {
		return (
			<div className="row justify-content-center">
				<div className="col-5 text-center">
					<form onSubmit={this.onSubmit}>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder="Enter a question..."
								value={this.state.question}
								onChange={({ target }) => this.oninput('question', target.value)}
							/>
							<div className="input-group-btn">
								<button className={`btn  ${this.state.question && !this.state.isLoading ? 'btn-primary' : 'btn-secondary disabled'}`}>
									Get Answers
								</button>
							</div>
						</div>
					</form>
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
export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
