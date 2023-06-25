const router = require('express').Router();
const authMiddleware = require('../authMiddleware');
const UserController = require('../controllers/users.controller');
const { uploadMiddleware } = require('../upload');

router.get('/', UserController.apiGetUsers);
router.get('/profile', authMiddleware, UserController.apiGetProfile);
router.get('/verify', authMiddleware, UserController.apiVerifyUser);
router.get('/top-results-global', UserController.apiGetTopResults);

router.post('/register', UserController.apiRegister);
router.post('/login', UserController.apiLogin);
router.post('/result', authMiddleware, UserController.apiPostResult);
router.post('/upload', authMiddleware, uploadMiddleware('file'), UserController.apiUploadFile);

router.put('/profile', authMiddleware, UserController.apiUpdateProfile);
router.put('/update-character', authMiddleware, UserController.apiUpdateCharacter);


router.delete('/:id', UserController.apiDeleteUser);


module.exports = router;