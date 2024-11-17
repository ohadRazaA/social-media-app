const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.post('/users/auth-users', userController.authUser);
router.patch('/users/add-friend', userController.addUsersFriend);

module.exports = router;