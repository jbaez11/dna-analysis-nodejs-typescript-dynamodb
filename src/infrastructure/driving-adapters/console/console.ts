import { type Dna } from '../../../domain/entities/Dna'
import { DnaCreatorUseCase } from '../../../application/useCases/DnaCreator'
import { InMemoryRepository } from '../../../infrastructure/implementations/InMemory/InMemoryRepository'
import { GetDnaAnalysisResultsUseCase } from '../../../application/useCases/GetDnaAnalysisResults'
(async () => {
  const inMemoryDnaRepo = new InMemoryRepository()
  const dnaCreatorUseCase = new DnaCreatorUseCase(inMemoryDnaRepo)
  const dnaCreate: Dna = {
    id: '2e',
    dna: [['A', 'B', 'C', 'D', 'E'], ['A', 'B', 'C', 'D', 'E'], ['A', 'B', 'C', 'D', 'E'], ['A', 'B', 'C', 'D', 'E'], ['A', 'B', 'C', 'D', 'E']],
    result: '200'
  }
  await dnaCreatorUseCase.run(dnaCreate)

  const getDnaAnalysisResultsUseCase = new GetDnaAnalysisResultsUseCase(inMemoryDnaRepo)
  const dnasReturned = await getDnaAnalysisResultsUseCase.run()
  console.log(dnasReturned)
})()
