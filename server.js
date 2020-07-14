const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors')

connectDB()

// init middleware

app.use(express.json({ extended: true }))

// router setup

app.use(cors()) // ? cors policy

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/post'))

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
