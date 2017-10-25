const tokenUtil = require('./token');

module.exports = {
	userRequired: async (req, res, next) => {
		try {
			let token = req.headers['authorization'];
			if (!token) throw 'Not logged in';

			let userData = await tokenUtil.verify(token);
			if (!userData) throw 'Invalid token';
			req.userData = userData;
			next();
		} catch (err) {
			console.log(err);
			res.status(403).send({ err });
		}
	}
};
