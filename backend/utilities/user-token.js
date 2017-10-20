const jwt = require('jsonwebtoken');

module.exports = {
	create: () => {},
	verify: token => {
		return new Promise((resolve, reject) => {
			jwt.verify(token, process.env.jwtSecretKey, (err, decodedToken) => {
				if (err || !decodedToken) reject(err);
				else resolve(decodedToken);
			});
		});
	}
};
