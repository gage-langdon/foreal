const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'User' },
	question: { type: String, ref: 'Question' },
	text: String,
	dateCreated: Date
});
const Response = mongoose.model('Response', ResponseSchema);

module.exports = module.exports = {
	create: ({ text, questionID, userID }) => {
		if (!text || !questionID || !userID) throw 'Missing data';
		return Response.create({
			text,
			user: userID,
			question: questionID,
			dateCreated: new Date()
		});
	},
	getById: id => {
		return Response.findById(id).populate('question');
	},
	getByQuestion: questionID => {
		return Response.find({ question: questionID });
	},
	getbyUser: userID => {
		return Response.find({ user: userID })
			.lean()
			.exec();
	}
};
