import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

class Response extends Component {
	constructor() {
		super();
		this.state = {
			question: null
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
									<div className="row">
										<div className="col-12 text-center">{question.text}</div>
										<div className="col-12 pt-5 text-center">response component here</div>
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
