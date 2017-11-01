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
			<div className="container pt-4">
				<div className="row justify-content-center">
					<div className="col-8 text-center">
						<FitText compressor={2}>
							<h1>Ask a new question</h1>
						</FitText>
						<hr className="" />
						<NewQuestion onLoading={isLoading => this.setState({ isNewQuestionLoading: isLoading })} />
						<hr />
					</div>
				</div>
			</div>
		);
	}
}
// {
// 	this.state.isNewQuestionLoading || this.props.isLoading ? (
// 		<div className="col-1 pb-4 d-flex justify-content-center">
// 			<Loading />
// 		</div>
// 	) : null;
// }
// {
// 	!this.props.isLoading && Questions.length < 1 ? (
// 		<div className="col-12 text-center">
// 			<span>No Questions Asked Yet</span>
// 		</div>
// 	) : null;
// }
//<div className="col-12">{Questions}</div>;

function mapStateToProps({ user }) {
	return {
		...user
	};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
