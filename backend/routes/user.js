const router = require('express').Router();
const Question = require('../models/question');
const Response = require('../models/response');
const { userRequired } = require('../utilities/middleware');
router.use(userRequired);

router.get('/questions', async (req, res) => {
	try {
		let questions = await Question.getByUser(req.userData._id);
		res.send({ questions });
	} catch (err) {
		res.status(400).send();
	}
});
router.get('/questions/:id', async (req, res) => {
	try {
		let question = await Question.getById(req.params.id);
		if (!question) throw 'Invalid question id';
		question.user = undefined;
		let responses = await Response.getByQuestion(req.params.id);
		res.send({ question, responses });
	} catch (err) {
		res.status(400).send();
	}
});
router.post('/questions/create', async (req, res) => {
	try {
		let { text } = req.body;
		await Question.create({ text, userID: req.userData._id });
		let questions = await Question.getByUser(req.userData._id);
		res.send({ questions });
	} catch (err) {
		res.status(400).send({ err });
	}
});

module.exports = router;
