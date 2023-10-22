import { type Dna } from '../../../domain/entities/Dna'
import { type DnaRepository } from '../../../domain/repositories/DnaRepository'

export class InMemoryRepository implements DnaRepository {
  private readonly dnaData: Dna[] = []

  async getAll (): Promise<Dna[]> {
    return this.dnaData
  }

  async save (dna: Dna): Promise<Dna> {
    this.dnaData.push(dna)
    return dna
  }
}
