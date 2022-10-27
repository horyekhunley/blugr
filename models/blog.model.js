const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: ['Title field is required', true],
	},
	description: {
		type: String,
		required: ['Description field is required', true],
	},
	author: {
		type: String,
		required: ['Author field is required', true],
	},
	state: {
		type: String,
		enum : ['draft','published'],
		default: 'draft'
	},
	read_count: {
		type: Number,
		default: 0,
	},
	reading_time: {

	},
	tags: {
		type: String,
		enum: [ 'Programming', 'Javascript', 'Java', 'TypeScript', 'Python', 'Rust', 'Product design', 'UI/UX', 'Code Newbie' ]

	},
	body: {
		type: String,
		required: ['Title field is required', true],
	},

}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)

module.exports = {
	Blog
}