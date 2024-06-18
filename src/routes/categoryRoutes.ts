import express from 'express'
import authenticateJWT from '../middlewares/auth'
import CategoryController from '../controllers/CategoryController'

const router = express.Router()
const categoryController = new CategoryController()

router.get('/list', authenticateJWT ,categoryController.list)
router.post('/create', authenticateJWT, categoryController.create)
router.put('/update/:id', authenticateJWT, categoryController.update)
router.delete('/delete/:id', authenticateJWT, categoryController.destroy)

export default router