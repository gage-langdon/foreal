const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	user: ObjectId,
	text: String,
	dateAdded: Date
});
const Question = mongoose.model('Question', QuestionSchema);

module.exports = {
	create: ({ text, user }) => {
		return Question.create({
			user,
			text,
			dateCreated: new Date()
		});
	},
	getById: async id => {
		let question = await Question.findById(id);
	}
};
