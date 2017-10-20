const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
	question: ObjectId,
	text: String,
	dateAdded: Date
});
const Response = mongoose.model('Response', ResponseSchema);

module.exports = module.exports = {
	create: ({ text, question }) => {
		return Response.create({
			text,
			question,
			dateCreated: new Date()
		});
	},
	getById: id => {
		return Response.findById(id).populate('question');
	}
};
