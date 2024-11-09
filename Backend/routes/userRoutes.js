const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.post('/auth-users', userController.authUser);

module.exports = router;