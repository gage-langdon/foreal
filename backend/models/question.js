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
			isClosed: false,
			dateCreated: new Date()
		});
	},
	getById: async id => {
		if (!id) throw 'Invalid question id';
		const rawQuestion = await Question.findById(id)
			.populate('user')
			.lean()
			.exec();
		const { _id, firstName, lastName } = rawQuestion.user;
		const question = { ...rawQuestion, user: { _id, firstName, lastName } };
		return question;
	},
	getByUser: userID => {
		if (!userID) throw 'Not logged in';
		return Question.find({ user: userID, isClosed: false })
			.lean()
			.exec();
	}
};
