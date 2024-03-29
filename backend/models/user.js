const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	notificationOK: Boolean,
	dateCreated: Date
});
const User = mongoose.model('User', UserSchema);

module.exports = {
	create: async ({ email, password, firstName, lastName, notificationOK }) => {
		if (!email || !password || !firstName || !lastName || !notificationOK) throw 'Missing required fields to create user';
		// TODO: hash password
		let user = await User.create({
			email: email.toLowerCase(),
			password,
			firstName: formatName(firstName),
			lastName: formatName(lastName),
			notificationOK,
			dateCreated: new Date()
		});
		return user;
	},
	getById: async id => {
		let user = await User.findById(id)
			.lean()
			.exec();
		return user;
	},
	login: ({ email, password }) => {
		if (!email || !password) throw 'Login requires email and password';
		// TODO: hash password
		let foundUser = User.findOne({ email, password })
			.lean()
			.exec();
		if (!foundUser) throw 'Invalid email or password';
		return foundUser;
	},
	exists: async ({ email }) => {
		if (!email) throw 'email required';
		let foundUser = await User.findOne({ email: email.toLowerCase() })
			.lean()
			.exec();
		if (foundUser) return true;
		else return false;
	}
};

const formatName = name => {
	return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
const clean = mongoObj => {
	return { ...mongoObj, password: undefined, email: undefined };
};
