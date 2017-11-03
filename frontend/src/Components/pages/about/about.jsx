import React, { Component } from 'react';
import FitText from 'react-fittext';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

// Components
import NewQuestion from '../../shared/new-question/new-question.jsx';

export default () => {
	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 text-center">
					<h1>What is this?</h1>
				</div>
				<div className="col-12" />
			</div>
		</div>
	);
};
