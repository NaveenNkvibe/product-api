const express = require('express');
const {getUser, deleteUser, editUser, blockUser, unBlockUser} = require('../controllers/userController');
const authProtect = require('../middlewares/auth')
const router = express.Router();

router.get('/', authProtect, getUser);
router.put('/edit', authProtect, editUser);
router.delete('/delete', authProtect, deleteUser);
router.post('/block', authProtect, blockUser);
router.post('/unblock', authProtect, unBlockUser);

module.exports = router;