import { type Request, type Response, Router, type NextFunction } from 'express'
// import { DnaAnalysisResultException } from '../../../../domain/exceptions/DnaAnalysisResultException'
import dnaRoutes from './dna.routes'

const route = Router()

route.use('/dna', dnaRoutes)

// route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof DnaAnalysisResultException) {
//     res.status(400).json({
//       message: 'matrix invalid'
//     })
//   } else {
//     next(err)
//   }
// })

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500)
  res.json({
    error: err
  })
})

export default route
