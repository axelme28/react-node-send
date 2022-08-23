const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const { check } = require('express-validator');

// @route POST api/users create a new user
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Password most be at least 8 characters').isLength({ min: 8 }),
  ],
  userController.createUser
);

module.exports = router;
