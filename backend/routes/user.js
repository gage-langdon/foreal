const router = require('express').Router();
const Question = require('../models/question');
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
router.post('/questions/create', async (req, res) => {
	try {
		let { text } = req.body;
		let question = await Question.create({ text, userID: req.userData._id });
		res.send({ question });
	} catch (err) {
		res.status(400).send({ err });
	}
});

module.exports = router;
