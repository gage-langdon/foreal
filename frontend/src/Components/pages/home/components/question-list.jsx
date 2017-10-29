import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../utilities/redux/actions/user';

// Components
import Question from './Question.jsx';

class QuestionList extends Component {
	constructor() {
		super();

		this.state = {};
	}
	render() {
		let { data, onRefresh } = this.props;
		let Questions = data.map(item => <Question key={item._id} question={item} onRefresh={onRefresh} />);

		return (
			<div className="container-fluid">
				<div className="row align-items-center justify-content-center">
					<div className="col pt-5 px-5">
						<div className="jumbotron" style={{ backgroundColor: '#ffffff', border: 'solid #e6f2ff 1px' }}>
							<div className="container" style={{ height: '70vh' }}>
								<div className="row justify-content-center">
									<div className="col">{Questions}</div>
								</div>
							</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
