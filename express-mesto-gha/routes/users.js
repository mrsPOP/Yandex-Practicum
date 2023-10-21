const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');
const {
  userAvatarValid,
  parameterIdValid,
  userValid,
} = require('../utils/validationUtils');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', parameterIdValid('userId'), getUser);

router.patch('/me', userValid, updateProfile);
router.patch('/me/avatar', userAvatarValid, updateAvatar);

module.exports = router;
