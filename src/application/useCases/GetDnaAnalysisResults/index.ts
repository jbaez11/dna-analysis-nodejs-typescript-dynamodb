import { type Dna } from '../../../domain/entities/Dna'
import { type DnaRepository } from '../../../domain/repositories/DnaRepository'
import { dnaStatsAnomalies, dnaStatsNoAnomalies, dnaRatio } from '../../../domain/shared/DnaStats'

export class GetDnaAnalysisResultsUseCase {
  private readonly _dnaRepository: DnaRepository

  constructor (dnaRepository: DnaRepository) {
    this._dnaRepository = dnaRepository
  }

  async run (): Promise<{ count_anomalies: number }> {
    const dnas: Dna[] = await this._dnaRepository.getAll()
    const totalAnomalies = dnaStatsAnomalies(dnas)
    const totalNoAnomalies = dnaStatsNoAnomalies(dnas)
    const ratio = dnaRatio(dnas)
    const results = {
      count_anomalies: totalAnomalies,
      count_no_anomalies: totalNoAnomalies,
      ratio
    }
    return results
  }
}
