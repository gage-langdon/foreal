import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

class NewQuestion extends Component {
	constructor() {
		super();

		this.state = {
			questionText: ''
		};
	}
	render() {
		return (
			<div className="row justify-content-center">
				<div className="col-5 text-center">
					<form>
						<div className="input-group">
							<input type="text" className="form-control" placeholder="Enter a question..." />
							<div className="input-group-btn">
								<button className="btn btn-secondary">Share</button>
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
