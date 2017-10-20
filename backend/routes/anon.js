const router = require('express').Router();
const Question = require('../models/question');
const Response = require('../models/response');

router.post('/respond', async (req, res) => {
	try {
		let { text, questionID } = req.body;
		let response = await Response.create({ text, questionID });
		res.send();
	} catch (err) {
		res.status(400).send();
	}
});

module.exports = router;
