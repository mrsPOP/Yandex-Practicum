const router = require('express').Router();
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');
const { userValid } = require('../utils/validationUtils');

router.get('/me', getUserInfo);
router.patch('/me', userValid, updateUserInfo);

module.exports = router;
