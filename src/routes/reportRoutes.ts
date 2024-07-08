import express from 'express'
import authenticateJWT from '../middlewares/auth'
import ReportController from '../controllers/ReportController'

const router = express.Router()
const reportController = new ReportController()

router.get('/history', authenticateJWT ,reportController.historyTransaction)
router.get('/sales', authenticateJWT, reportController.salesReport)

export default router