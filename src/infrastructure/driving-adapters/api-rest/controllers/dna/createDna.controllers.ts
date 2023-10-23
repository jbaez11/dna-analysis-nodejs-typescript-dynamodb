import { v4 as uuidv4 } from 'uuid'
import { type NextFunction, type Request, type Response } from 'express'
import { type Dna } from '../../../../../domain/entities/Dna'
import { DnaCreatorUseCase } from '../../../../../application/useCases/DnaCreator'
import { DynamoDBDnaRepository } from '../../../../../infrastructure/implementations/AWS/dynamo-db/DynamoDBDnaRepository'

export const createDna = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    dna
  } = req.body

  const dynamoDBDnaRepo = new DynamoDBDnaRepository()
  const dnaCreatorUseCase = new DnaCreatorUseCase(dynamoDBDnaRepo)

  const dnaToCreate: Dna = {
    id: uuidv4(),
    dna,
    result: ''
  }

  try {
    const dataCreated = await dnaCreatorUseCase.run(dnaToCreate)
    res.status(parseInt(dataCreated.result)).send()
  } catch (e) {
    next(e)
  }
}
