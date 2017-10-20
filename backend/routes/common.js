const router = require('express').Router();
const User = require('../models/user');
const tokenUtil = require('../utilities/token');

router.post('/login', async (req, res) => {
	try {
		let { email, password } = req.body;
		let user = await User.login({ email, password });
		if (!user) res.status(403).send();
		else {
			let token = await userToken(user);
			res.send({ user, token });
		}
	} catch (err) {
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

module.exports = router;

async function userToken(user) {
	let tokenObj = {
		_id: user._id,
		email: user.email
	};
	return await tokenUtil.create({ tokenObj });
}
