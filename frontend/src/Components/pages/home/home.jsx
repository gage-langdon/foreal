import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

// components
import NewQuestion from '../../shared/new-question/new-question.jsx';

class Home extends Component {
	constructor() {
		super();

		this.state = {
			headlinePeoples: ['friends', 'family', 'coworkers', 'followers', 'fans', 'employees', 'bosses'],
			questions: [
				'How can I be a better friend?',
				'How can I be a better coworker?',
				'Why did we become distant?',
				'How did I do in todays presentation?',
				'What would make my content better?',
				'How can I make myself more attractive?'
			],
			headlinePeopleIndex: 0,
			isMounted: false,
			question: ''
		};
	}
	componentDidMount() {
		this.setState({ isMounted: true });
		this.loopHeadline();
	}
	componentWillUnmount() {
		this.setState({ isMounted: false });
	}
	loopHeadline() {
		let newIndex = 0;
		if (this.state.headlinePeopleIndex + 1 < this.state.headlinePeoples.length - 1) newIndex = this.state.headlinePeopleIndex + 1;
		setTimeout(() => {
			if (this.state.isMounted) this.setState({ headlinePeopleIndex: newIndex }, () => this.loopHeadline());
		}, 1500);
	}
	questions() {
		return this.state.questions.filter(item => item !== this.state.question).map((item, i) => (
			<li className="py-1" key={'QUES_' + i} style={{ cursor: 'pointer' }} onClick={() => this.setState({ question: item })}>
				{item}
			</li>
		));
	}
	render() {
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
							<div className="container">
								<div className="row">
									<div className="col-12 text-center">
										<h1>Ask your {this.state.headlinePeoples[this.state.headlinePeopleIndex]} questions</h1>
										<h2>Get truly anonymous and honest answers</h2>
									</div>
									<div className="col-12 pt-5">
										<NewQuestion preLoadedQuestion={this.state.question} />
									</div>
								</div>
								<div className="row justify-content-center pt-5">
									<div className="col-4">
										<ul style={{ listStyleType: 'none' }}>{this.questions()}</ul>
									</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
