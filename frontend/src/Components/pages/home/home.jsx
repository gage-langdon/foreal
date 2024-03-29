import React, { Component } from 'react';
import FitText from 'react-fittext';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../utilities/redux/actions/user';

// Components
import NewQuestion from '../../shared/new-question/new-question.jsx';
import Questions from './components/question-list.jsx';

class Home extends Component {
	constructor() {
		super();

		this.onNewQuestion = this.onNewQuestion.bind(this);
		this.onRefreshQuestion = this.onRefreshQuestion.bind(this);

		this.state = {
			headlinePeoples: ['friends', 'family', 'coworkers', 'followers', 'fans', 'employees', 'bosses'],
			questions: [
				'What do you think of me?',
				'How can I be a better friend?',
				'What is one thing I should stop doing?',
				'How can I be a better coworker?',
				'How did I do in todays presentation?',
				'What are you scared of?',
				'What would make my content better?',
				'What do you struggle with?'
			],
			headlinePeopleIndex: 0,
			isMounted: false,
			question: '',
			isLoadingQuestions: false
		};
	}
	componentDidMount() {
		this.setState({ isMounted: true });
		this.loopHeadline();

		if (this.props.isLoggedIn) this.initLoggedIn();
	}
	componentWillReceiveProps(nextProps) {
		// check if user logged in
		if (nextProps.isLoggedIn && !this.props.isLoggedIn) this.initLoggedIn();
	}
	initLoggedIn() {
		this.getQuestions();
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
			<div className="col-12 py-1" key={'QUES_' + i} style={{ cursor: 'pointer' }} onClick={() => this.setState({ question: item })}>
				<span>{item}</span>
			</div>
		));
	}
	onNewQuestion(newQuestion) {
		this.props.history.push(`/${newQuestion._id}`);
	}
	onRefreshQuestion() {
		this.getQuestions();
	}
	async getQuestions() {
		this.setState({ isLoadingQuestions: true });
		await this.props.GetQuestions();
		this.setState({ isLoadingQuestions: false });
	}
	render() {
		if (this.props.isLoggedIn && this.props.questions) {
			return (
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12">
							<Questions data={this.props.questions} onRefresh={this.onRefreshQuestion} isLoading={this.state.isLoadingQuestions} />
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="container">
					<div className="row justify-content-center pt-4">
						<div className="col-12 text-center">
							<FitText>
								<h1>Ask your {this.state.headlinePeoples[this.state.headlinePeopleIndex]}</h1>
							</FitText>
							<FitText compressor={2}>
								<h2 className="pt-2">Get truly anonymous and honest answers</h2>
							</FitText>
						</div>
						<div className="col-12 col-md-8 col-lg-6 pt-5">
							<NewQuestion preLoadedQuestion={this.state.question} onNewQuestion={this.onNewQuestion} hasPreload />
						</div>
					</div>
					<div className="row justify-content-center pt-5 text-center">{this.questions()}</div>
				</div>
			);
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
