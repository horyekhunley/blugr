const express = require('express')
const mongoose = require("mongoose");
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

const userRoutes = require('./routes/user.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_URI)
		.then(() => console.log('Mongodb connected'))
		.catch(err => console.log('Mongodb error'))

app.get('/', (req, res) => {
	res.send('Blugr api up')
})
app.use('/api', userRoutes)

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))