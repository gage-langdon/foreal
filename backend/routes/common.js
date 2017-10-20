const router = require('express').Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
	try {
		let { email, password } = req.body;
		let user = await User.login({ email, password });
		console.log(user);
		if (!user) res.status(403).send();
		else res.send({ user });
	} catch (err) {
		res.status(400).send({ err });
	}
});
router.post('/sign-up', async (req, res) => {
	try {
		let { email, password, firstName, lastName, notificationOK } = req.body;
		if (await User.exists({ email })) throw 'User with that email already exists';
		let user = await User.create({ email, password, firstName, lastName, notificationOK });
		res.send({ user });
	} catch (err) {
		console.log(err);
		res.status(400).send({ err });
	}
});

module.exports = router;
