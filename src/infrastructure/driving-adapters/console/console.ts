import path from 'path'
import * as dotenv from 'dotenv'
import { type Dna } from '../../../domain/entities/Dna'
import { DnaCreatorUseCase } from '../../../application/useCases/DnaCreator'
// import { InMemoryRepository } from '../../../infrastructure/implementations/InMemory/InMemoryRepository'
import { DynamoDBDnaRepository } from '../../../infrastructure/implementations/AWS/dynamo-db/DynamoDBDnaRepository'
import { GetDnaAnalysisResultsUseCase } from '../../../application/useCases/GetDnaAnalysisResults'
(async () => {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })
  const dynamoDBDnaRepo = new DynamoDBDnaRepository()
  const dnaCreatorUseCase = new DnaCreatorUseCase(dynamoDBDnaRepo)
  const dnaCreate: Dna = {
    id: '3',
    dna: [['A', 'B', 'C', 'D', 'E'], ['A', 'B', 'C', 'D', 'E'], ['A', 'B', 'C', 'D', 'E'], ['A', 'B', 'C', 'D', 'E'], ['A', 'B', 'C', 'D', 'E']],
    result: '200'
  }
  await dnaCreatorUseCase.run(dnaCreate)

  const getDnaAnalysisResultsUseCase = new GetDnaAnalysisResultsUseCase(dynamoDBDnaRepo)
  const dnasReturned = await getDnaAnalysisResultsUseCase.run()
  console.log(dnasReturned)
})()
