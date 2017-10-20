const router = require('express').Router();
const { userRequired } = require('../utilities/middleware');

router.use(userRequired);

router.post('/question', async (req, res) => {
	try {
	} catch (err) {
		console.log(err);
		res.status(400).send({ err });
	}
});

module.exports = router;
