const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

//create an express app
const app = express();

//connect to mongoDB
connectDB();

//port number
const port = process.env.PORT || 8080;

//enable read body data
app.use(express.json());

//define routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

console.log('starting server');

//run the app on port
app
	.listen(port, () => {
		console.log(`Server running on port: ${port}`);
	})
	.on('error', err => {
		console.log(err);
	})
	.on('close', () => {
		console.log(`Server closed on port: ${port}`);
	});
