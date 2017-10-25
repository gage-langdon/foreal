const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'User' },
	text: String,
	isCurrent: Boolean,
	isClosed: Boolean,
	dateCreated: Date
});
const Question = mongoose.model('Question', QuestionSchema);

module.exports = {
	create: ({ text, userID }) => {
		if (!text) throw 'Missing question text';
		if (!userID) throw 'Must be logged in to submit question';
		return Question.create({
			user: userID,
			text,
			isCurrent: true,
			isClosed: false,
			dateCreated: new Date()
		});
	},
	getById: async id => {
		if (!id) throw 'Invalid question id';
		let question = await Question.findById(id).populate('user');
		let { _id, firstName, lastName } = question.user;
		question.user = { _id, firstName, lastName };
		return question;
	},
	getByUser: userID => {
		if (!userID) throw 'Not logged in';
		return Question.find({ user: userID });
	},
	getCurrent: async userID => {
		let question = await Question.findOne({ user: userID, isCurrent: true })
			.populate('user')
			.lean()
			.exec();
		if (question && question.user) {
			let { _id, firstName, lastName } = question.user;
			question.user = { _id, firstName, lastName };
		}
		return question;
	},
	hasCurrent: async userID => {
		if (!userID) throw 'Not logged in';
		let questions = await Question.find({ isCurrent: true, user: userID });
		return questions && questions.length > 0;
	}
};
