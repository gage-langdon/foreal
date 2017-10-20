const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
	question: { type: Schema.ObjectId, ref: 'Question' },
	text: String,
	dateCreated: Date
});
const Response = mongoose.model('Response', ResponseSchema);

module.exports = module.exports = {
	create: ({ text, questionID }) => {
		if (!text || !questionID) throw 'Missing data';
		return Response.create({
			text,
			question: questionID,
			dateCreated: new Date()
		});
	},
	getById: id => {
		return Response.findById(id).populate('question');
	},
	getByQuestion: questionID => {
		return Response.find({ question: questionID });
	}
};
