const router = require('express').Router();
const User = require('../models/user');
const tokenUtil = require('../utilities/token');

const Question = require('../models/question');

router.post('/login', async (req, res) => {
	try {
		let { email, password } = req.body;
		let user = await User.login({ email: email.toLowerCase(), password });
		if (!user) res.status(403).send();
		else {
			let token = await userToken(user);
			res.send({ user, token });
		}
	} catch (err) {
		console.log(err);
		res.status(400).send({ err });
	}
});
router.post('/sign-up', async (req, res) => {
	try {
		let { email, password, firstName, lastName, notificationOK } = req.body;
		if (await User.exists({ email })) throw 'User with that email already exists';
		let user = await User.create({ email, password, firstName, lastName, notificationOK });

		let token = await userToken(user);
		res.send({ user, token });
	} catch (err) {
		res.status(400).send({ err });
	}
});
router.get('/questions/:id', async (req, res) => {
	try {
		let question = await Question.getById(req.params.id);
		if (!question) throw 'Invalid question id';
		res.send({ question });
	} catch (err) {
		res.status(400).send();
	}
});

module.exports = router;

async function userToken(user) {
	let tokenObj = {
		_id: user._id,
		email: user.email
	};
	return await tokenUtil.create({ tokenObj });
}
