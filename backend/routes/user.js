const router = require('express').Router();
const Question = require('../models/question');
const Response = require('../models/response');
const { userRequired } = require('../utilities/middleware');
router.use(userRequired);

router.get('/questions', async (req, res) => {
	try {
		const questions = await Question.getByUser(req.userData._id);
		const responses = await Response.getbyUser(req.userData._id);
		const questionsWResponses = questions
			.map(question => {
				const foundResponses = responses.filter(item => item.question.toString() === question._id.toString());
				if (foundResponses) {
					const sortedResponses = foundResponses.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
					const questionWresponse = { ...question, responses: sortedResponses };
					return questionWresponse;
				} else return { ...question, responses: [] };
			})
			.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
		res.send({ questions: questionsWResponses });
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
		console.log(err);
		res.status(400).send({ err });
	}
});
router.post('/questions/delete', async (req, res) => {
	try {
		let { questionID } = req.body;
		await Question.delete(questionID);
		res.send();
	} catch (err) {
		res.status(400).send();
	}
});
router.get('/questions/:id', async (req, res) => {
	try {
		const question = await Question.getById(req.params.id);
		if (!question) throw 'Invalid question id';

		const responses = await Response.getByQuestion(req.params.id);
		const sortedResponses = responses.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
		res.send({ question, responses: sortedResponses });
	} catch (err) {
		console.log(err);
		res.status(400).send();
	}
});
module.exports = router;
