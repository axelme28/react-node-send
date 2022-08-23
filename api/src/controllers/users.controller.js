const User = require('../models/User');
const bcrypt = require('bcrypt');
const validationResult = require('express-validator').validationResult;

exports.createUser = async (req, res) => {
	//show validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// validate if the user already exists
	const { email, password } = req.body;

	let user = await User.findOne({ email });

	if (user) {
		return res.status(400).json({ msg: 'User already exists' });
	}
	// create a new user
	user = new User(req.body);

	// hash the password
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(password, salt);
	try {
		await user.save();
		res.status(201).json({
			message: 'User created successfully',
			user: user,
		});
	} catch (error) {
		res.status(500).json({
			message: 'User not created',
			error: error.message,
		});
	}
};
