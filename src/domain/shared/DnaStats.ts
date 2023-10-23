export function dnaStatsAnomalies (data: any[]): number {
  const countAnomalies = data.filter((data) => data.result === '200').length
  return countAnomalies
}

export function dnaStatsNoAnomalies (data: any[]): number {
  const countNoAnomalies = data.filter((data) => data.result === '403').length
  return countNoAnomalies
}

export function dnaRatio (data: any[]): number {
  const totalRequests = data.length
  const countAnomalies = dnaStatsAnomalies(data)
  const ratio = (countAnomalies / totalRequests)
  return ratio
}
