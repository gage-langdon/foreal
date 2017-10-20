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

// routes
app.use('/', require('./routes/common'));
app.use('/user', require('./routes/user'));
app.use('/anon', require('./routes/anon'));

app.listen('8080', () => {
	console.log('listening on 8080');
});
