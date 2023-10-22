export class DnaAnalysisResultException extends Error {
  constructor () {
    super('JSON no válido o matriz de ADN vacía.')
  }
}
