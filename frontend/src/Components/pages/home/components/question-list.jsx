import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../utilities/redux/actions/user';

// Components
import Question from '../../../shared/question/question.jsx';

class QuestionList extends Component {
	constructor() {
		super();

		this.state = {};
	}
	componentWillMount() {
		if (this.props.isLoggedIn) this.props.GetQuestions();
	}
	render() {
		if (this.props.isLoggedIn) {
			let questions = this.props.questions.map(({ _id, text, responses, dateCreated }, i) => (
				<tr key={`table_row_${i}`}>
					<td>{text}</td>
					<td>{dateCreated}</td>
					<td className="text-center">{responses ? responses.length : 0}</td>
					<td>
						<Link to={`/${_id}`}>{`foreal.io/${_id}`}</Link>
					</td>
				</tr>
			));
			return (
				<div className="container-fluid">
					<div className="row align-items-center justify-content-center">
						<div className="col pt-5 px-5">
							<div className="jumbotron" style={{ backgroundColor: '#ffffff', border: 'solid #e6f2ff 1px' }}>
								<div className="container" style={{ height: '70vh' }}>
									<div className="row">
										<div className="col-12">{`Hey ${this.props.user.firstName}!`}</div>
										<div className="row justify-content-center pt-5">
											<div className="col-12">
												<table className="table">
													<thead>
														<tr>
															<th>Question</th>
															<th>Date Asked</th>
															<th>Responses</th>
															<th>Share Link</th>
														</tr>
													</thead>
													<tbody>{questions}</tbody>
												</table>
											</div>
										</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
