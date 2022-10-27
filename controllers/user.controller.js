
const { User } = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

exports.registerUser = async (req, res) => {
	const { first_name, last_name, email, password } = req.body

  if (!first_name || !last_name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create new user
  const user = await User.create({
    first_name,
	last_name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      first_name: user.first_name,
	  last_name: user.last_name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
}

exports.loginUser = async (req, res) => {
	const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      first_name: user.first_name,
	  last_name: user.last_name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials', err)
  }
}

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
	  expiresIn: '30d',
	})
  }