import express from 'express'
import { analyzeDocument, askQuestion } from '../controllers/documentController.js'
import upload from '../middleware/upload.js'

const router = express.Router()
router.post('/analyze', upload.single('document'), analyzeDocument)
router.post('/ask', askQuestion)
export default router