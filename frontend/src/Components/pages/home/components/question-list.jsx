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

		return <div className="col pt-5">{Questions}</div>;
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
