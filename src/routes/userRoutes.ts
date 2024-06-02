import express from 'express'
import UserController from '../controllers/UserController'
import authenticateJWT from '../middlewares/auth'

const router = express.Router()
const userController = new UserController()

router.post('/login', userController.login)
router.get('/list', userController.list)
router.post('/create', userController.create)
router.get('/profile', authenticateJWT ,userController.findBy)

export default router