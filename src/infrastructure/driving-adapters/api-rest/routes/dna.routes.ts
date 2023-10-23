import { Router } from 'express'
import { createDnaController, getDnaResultsController } from '../controllers/index'

const route = Router()

route.post('/validate-anomaly', createDnaController)
route.get('/stats', getDnaResultsController)

export default route
