const router = require('express').Router()
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  changePassword,
  verifyUser
} = require('../controllers/user.controller')
const { verifyToken } = require('../middlewares/token.middleware')
const { multer, multerUpload, sendUploadToGCS } = require('../helpers/image')

router.post('/register', multer.single('image'), sendUploadToGCS, registerUser)
router.post('/login', loginUser)
router.patch('/', verifyToken, multerUpload.single('image'), sendUploadToGCS, updateUser)
router.put('/pass', verifyToken, changePassword)
router.delete('/', verifyToken ,deleteUser)
router.get('/token', verifyToken, verifyUser)

module.exports = router
