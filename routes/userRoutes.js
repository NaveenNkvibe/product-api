const express = require('express');
const {getUser, deleteUser, editUser, blockUser, unBlockUser} = require('../controllers/userController');
const authProtect = require('../middlewares/auth')
const { validateEditUser } = require('../middlewares/validation');
const router = express.Router();

router.get('/', authProtect, getUser); // Define get user details route
router.put('/edit', authProtect, validateEditUser, editUser); // Define edit user route
router.delete('/delete', authProtect, deleteUser); // Define delete user route
router.post('/block', authProtect, blockUser); // Define block other user route
router.post('/unblock', authProtect, unBlockUser); // Define unblock other user route

module.exports = router;