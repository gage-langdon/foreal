const router = require('express').Router();
const Question = require('../models/question');
const Response = require('../models/response');

router.post('/respond', async (req, res) => {
	try {
		let { text, questionID } = req.body;
		let question = await Question.getById(questionID);
		if (!question) throw 'Invalid question';
		let response = await Response.create({ text, questionID, userID: question.user._id });
		res.send();
	} catch (err) {
		console.log(err);
		res.status(400).send();
	}
});

module.exports = router;
