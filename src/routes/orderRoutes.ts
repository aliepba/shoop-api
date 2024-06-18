import express from 'express'
import authenticateJWT from '../middlewares/auth'
import OrderController from '../controllers/OrderController'

const router = express.Router()
const orderController = new OrderController()

router.get('/list', authenticateJWT, orderController.list)
router.post('/create', authenticateJWT, orderController.create)
router.delete('/delete/:id', authenticateJWT, orderController.delete)

export default router