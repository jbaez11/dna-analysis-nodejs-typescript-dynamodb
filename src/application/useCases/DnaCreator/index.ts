import { type Dna } from '../../../domain/entities/Dna'
import { type DnaRepository } from '../../../domain/repositories/DnaRepository'

export class DnaCreatorUseCase {
  private readonly _dnaRepository: DnaRepository

  constructor (dnaRepository: DnaRepository) {
    this._dnaRepository = dnaRepository
  }

  async run (body: Dna): Promise<Dna> {
    const dnaCreated: Dna = await this._dnaRepository.save(body)
    return dnaCreated
  }
}
