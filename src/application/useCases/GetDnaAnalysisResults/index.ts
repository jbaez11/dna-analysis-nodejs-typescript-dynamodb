import { type Dna } from '../../../domain/entities/Dna'
import { type DnaRepository } from '../../../domain/repositories/DnaRepository'

export class GetDnaAnalysisResultsUseCase {
  private readonly _dnaRepository: DnaRepository

  constructor (dnaRepository: DnaRepository) {
    this._dnaRepository = dnaRepository
  }

  async run (): Promise<Dna[]> {
    const dnas: Dna[] = await this._dnaRepository.getAll()
    return dnas
  }
}
