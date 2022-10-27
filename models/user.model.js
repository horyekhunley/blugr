const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: ['First name is required', true],
	},
	last_name: {
		type: String,
		required: ['last name is required', true],
	},
	email: {
		type: String,
		required: ['Email field is required', true],
		unique: ['Email already exists', true],
	},
	password: {
		type: String,
		required: ['Passport is required', true]

	},
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = {
	User
}