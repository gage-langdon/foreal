import React, { Component } from 'react';
import FitText from 'react-fittext';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../utilities/redux/actions/user';

// Components
import Question from './Question.jsx';
import NewQuestion from '../../../shared/new-question/new-question.jsx';
import Loading from '../../../shared/Loading.jsx';

class QuestionList extends Component {
	constructor() {
		super();

		this.state = {
			isNewQuestionLoading: false
		};
	}
	render() {
		let { data, onRefresh } = this.props;
		let Questions = data.map(item => <Question key={item._id} question={item} onRefresh={onRefresh} />);

		return (
			<div className="row justify-content-center">
				<div className="col-12">
					<div className="container-fluid">
						<div className="row align-items-center justify-content-center">
							<div className="col-12 col-xl-8 pt-1 px-0">
								<div className="jumbotron py-3" style={{ backgroundColor: '#ffffff', border: 'solid #e6f2ff 1px' }}>
									<div className="container ">
										<div className="row">
											<div className="col pl-0">
												<FitText compressor={1.5}>
													<h1 style={{ fontFamily: 'Roboto, San-Serif' }}>Ask a new question</h1>
												</FitText>
												<hr className="" />
												<NewQuestion onLoading={isLoading => this.setState({ isNewQuestionLoading: isLoading })} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{this.state.isNewQuestionLoading || this.props.isLoading ? (
					<div className="col-12 pb-4 d-flex justify-content-center">
						<Loading />
					</div>
				) : null}
				{!this.props.isLoading && Questions.length < 1 ? (
					<div className="col-12 text-center">
						<span>No Questions Asked Yet</span>
					</div>
				) : null}
				<div className="col-12">{Questions}</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
