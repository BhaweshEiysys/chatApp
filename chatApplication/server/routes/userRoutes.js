const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

// Create a new user
router.post('/', UserController.createUser);

module.exports = router;
