import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

class NewQuestion extends Component {
	constructor() {
		super();

		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			question: ''
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

		console.log('submit', this.state.question);
		try {
			if (this.state.question) await this.props.CreateQuestion(this.state.question);
			console.log('good to go');
		} catch (err) {
			console.log(err);
		}
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
								<button className={`btn  ${this.state.question ? 'btn-primary' : 'btn-secondary disabled'}`}>Get Answers</button>
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
