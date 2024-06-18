import express from 'express'
import authenticateJWT from '../middlewares/auth'
import ProductController from '../controllers/ProductController'

const router = express.Router()
const productController = new ProductController()

router.get('/list' ,productController.list)
router.post('/create', authenticateJWT, productController.create)
router.put('/update/:id', authenticateJWT, productController.update)
router.delete('/delete/:id', authenticateJWT, productController.destroy)

router.post('/upload-image', authenticateJWT, productController.uploadImage)

export default router