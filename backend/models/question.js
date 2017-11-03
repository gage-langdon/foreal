const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortId = require('shortid');

const QuestionSchema = new Schema({
	_id: { type: String },
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
			_id: ShortId.generate(),
			user: userID,
			text,
			isClosed: false,
			dateCreated: new Date()
		});
	},
	getById: async id => {
		if (!id) throw 'no id received';
		const rawQuestion = await Question.findById(id)
			.populate('user')
			.lean()
			.exec();
		if (!rawQuestion) throw 'invalid question id';
		const { _id, firstName, lastName } = rawQuestion.user;
		const question = { ...rawQuestion, user: { _id, firstName, lastName } };
		return question;
	},
	getByUser: userID => {
		if (!userID) throw 'Not logged in';
		return Question.find({ user: userID, isClosed: false })
			.lean()
			.exec();
	},
	delete: async id => {
		if (!id) throw 'no id received';
		const foundQuestion = await Question.findById(id);
		if (!foundQuestion) throw 'invalid question id';
		foundQuestion.isClosed = true;
		return foundQuestion.save();
	},
	purge: userID => {
		if (!userID) throw 'Not logged in';
		return Question.find({ user: userID })
			.remove()
			.exec();
	}
};
