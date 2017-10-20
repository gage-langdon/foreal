const tokenUtil = require('./token');

module.exports = {
	userRequired: async (req, res, next) => {
		try {
			let token = req.headers['authorization'];
			if (!token) throw 'No token provided';

			let userData = await tokenUtil.verify(token);
			req.userData = userData;
			next();
		} catch (err) {
			res.status(403).send({ err });
		}
	}
};
