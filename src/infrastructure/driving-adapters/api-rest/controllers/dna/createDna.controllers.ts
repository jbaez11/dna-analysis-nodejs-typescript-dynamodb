import { v4 as uuidv4 } from 'uuid'
import { type NextFunction, type Request, type Response } from 'express'
import { type Dna } from '../../../../../domain/entities/Dna'
import { DnaCreatorUseCase } from '../../../../../application/useCases/DnaCreator'
import { DynamoDBDnaRepository } from '../../../../../infrastructure/implementations/AWS/dynamo-db/DynamoDBDnaRepository'

export const createDna = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    dna,
    result
  } = req.body

  const dynamoDBDnaRepo = new DynamoDBDnaRepository()
  const dnaCreatorUseCase = new DnaCreatorUseCase(dynamoDBDnaRepo)

  const dnaToCreate: Dna = {
    id: uuidv4(),
    dna,
    result
  }

  try {
    await dnaCreatorUseCase.run(dnaToCreate)
    res.status(200).send()
  } catch (e) {
    next(e)
  }
}
