import { type Dna } from '../../domain/entities/Dna'

export interface DnaRepository {
  getAll: () => Promise<Dna[]>
  save: (dna: Dna) => Promise<Dna>
}
