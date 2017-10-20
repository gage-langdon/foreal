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
	create: ({ email, password, firstName, lastName, notificationOK }) => {
		if (!email || !password || !firstName || !lastName || !notificationOK) throw 'Missing required fields to create user';
		// TODO: hash password
		return User.create({
			email: email.toLowerCase(),
			password,
			firstName: firstName.toLowerCase(),
			lastName: lastName.toLowerCase(),
			notificationOK,
			dateCreated: new Date()
		});
	},
	getById: id => {
		return User.findById(id);
	},
	login: ({ email, password }) => {
		if (!email || !password) throw 'Login requires email and password';
		// TODO: hash password
		let foundUser = User.findOne({ email, password });
		if (!foundUser) throw 'Invalid email or password';
		// remove password
		return foundUser;
	},
	exists: async ({ email }) => {
		if (!email) throw 'email required';
		let foundUser = await User.findOne({ email: email.toLowerCase() });
		if (foundUser) return true;
		else return false;
	}
};
