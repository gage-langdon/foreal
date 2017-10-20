const jwt = require('jsonwebtoken');

module.exports = {
	create: payload => {
		return new Promise((resolve, reject) => {
			jwt.sign(payload, process.env.jwtSecretKey, (err, encodedToken) => {
				if (err || !encodedToken) reject('Issue creating token');
				else resolve(encodedToken);
			});
		});
	},
	verify: token => {
		return new Promise((resolve, reject) => {
			jwt.verify(token, process.env.jwtSecretKey, (err, decodedToken) => {
				if (err || !decodedToken) reject('Invalid token');
				else resolve(decodedToken.tokenObj);
			});
		});
	}
};
