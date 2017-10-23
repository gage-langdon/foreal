const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'User' },
	text: String,
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
			dateCreated: new Date()
		});
	},
	getById: async id => {
		if (!id) throw 'no id';
		let question = await Question.findById(id).populate('user');
		let { _id, firstName, lastName } = question.user;
		question.user = { _id, firstName, lastName };
		return question;
	},
	getByUser: userID => {
		if (!userID) throw 'no user id';
		return Question.find({ user: userID });
	}
};
