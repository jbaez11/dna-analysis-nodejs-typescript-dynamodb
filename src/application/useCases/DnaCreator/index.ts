import { type Dna } from '../../../domain/entities/Dna'
import { type DnaRepository } from '../../../domain/repositories/DnaRepository'
import { dnaValidation } from '../../../domain/shared/DnaValidation'

export class DnaCreatorUseCase {
  private readonly _dnaRepository: DnaRepository

  constructor (dnaRepository: DnaRepository) {
    this._dnaRepository = dnaRepository
  }

  async run (body: Dna): Promise<Dna> {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const resultValidation = await dnaValidation(body.dna)
    const create = {
      dna: body.dna,
      result: resultValidation,
      id: body.id
    }
    const dnaCreated: Dna = await this._dnaRepository.save(create)
    return dnaCreated
  }
}
