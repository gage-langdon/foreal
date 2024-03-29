import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
			isLoading: false,
			isSubmitWithoutLogIn: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.preLoadedQuestion) this.setState({ question: nextProps.preLoadedQuestion });
		if (nextProps.isLoggedIn && this.state.isSubmitWithoutLogIn) this.setState({ isSubmitWithoutLogIn: false });
	}
	oninput(fieldName, value) {
		let formatted = value.charAt(0).toUpperCase() + value.slice(1);
		this.setState({ [fieldName]: formatted });
	}
	async onSubmit(e) {
		e.preventDefault();
		try {
			if (this.state.question) {
				if (this.props.isLoggedIn) {
					this.setState({ isSubmitWithoutLogIn: false });
					this.onLoading(true);
					let newQuestion = await this.props.CreateQuestion(this.state.question);
					await this.props.GetQuestions();
					this.setState({ question: '' });
					this.onLoading(false);
					if (this.props.onNewQuestion) {
						this.props.onNewQuestion(newQuestion);
					}
				} else {
					this.setState({ isSubmitWithoutLogIn: true });
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
				<div className="col text-center hidden-md-down">
					<form onSubmit={this.onSubmit}>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder={this.props.hasPreload ? 'Enter a question or choose one below...' : 'Enter a question...'}
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
				<div className="col text-center hidden-lg-up">
					<form onSubmit={this.onSubmit}>
						<input
							type="text"
							className="form-control text-center"
							placeholder={this.props.hasPreload ? 'Enter a question or choose one below...' : 'Enter a question...'}
							value={this.state.question}
							onChange={({ target }) => this.oninput('question', target.value)}
						/>
						<button
							className={`mt-2 btn btn-block ${this.state.question && !this.state.isLoading
								? 'btn-primary'
								: 'btn-secondary disabled'}`}
						>
							Get Answers
						</button>
					</form>
				</div>
				{this.state.isSubmitWithoutLogIn ? (
					<div className="col-12 text-center pt-2">
						<Link to="sign-in" style={{ color: 'red' }}>
							<span>Please sign in to ask a question</span>
						</Link>
					</div>
				) : null}
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
