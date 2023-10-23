import { type NextFunction, type Request, type Response } from 'express'
import { DynamoDBDnaRepository } from '../../../../../infrastructure/implementations/AWS/dynamo-db/DynamoDBDnaRepository'
import { GetDnaAnalysisResultsUseCase } from '../../../../../application/useCases/GetDnaAnalysisResults'

export const getDnaResults = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBDnaRepo = new DynamoDBDnaRepository()
  const getDnaAnalysisResultsUseCase = new GetDnaAnalysisResultsUseCase(dynamoDBDnaRepo)

  try {
    const stats = await getDnaAnalysisResultsUseCase.run()
    res.json(stats)
  } catch (e) {
    next(e)
  }
}
