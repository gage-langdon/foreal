const express = require('express');
const app = express();
const env = require('dotenv').config({ path: './.env' });
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongo, {
	useMongoClient: true
});

const WHITELIST = ['http://localhost:3000'];
const allowCrossDomain = (req, res, next) => {
	let origin = req.headers.origin;
	// if (WHITELIST.indexOf(origin) > -1) {
	res.setHeader('Access-Control-Allow-Origin', origin);
	// }
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-XSRF-TOKEN, Content-Length, X-Requested-With');

	if ('OPTIONS' == req.method) {
		res.status(200).send();
	} else {
		next();
	}
};
app.use(allowCrossDomain);

// routes
app.use('/', require('./routes/common'));
app.use('/user', require('./routes/user'));
app.use('/anon', require('./routes/anon'));

app.listen('8080', () => {
	console.log('listening on 8080');
});
