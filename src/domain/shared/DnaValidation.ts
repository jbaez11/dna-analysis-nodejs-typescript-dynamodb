export function dnaValidation (DNA: any[]): string {
  if (Array.isArray(DNA) && DNA.length > 0) {
    const isAnomalous = validateDNA(DNA)
    if (isAnomalous) {
      return '200'
    } else {
      return '403'
    }
  } else {
    return '400'
  }
}

function validateDNA (dna: string[][]): boolean {
  // Función para verificar si hay 3 o más letras consecutivas en una lista
  function hasConsecutiveLetters (sequence: string[]): boolean {
    for (let i = 0; i < sequence.length - 2; i++) {
      if (sequence[i] === sequence[i + 1] && sequence[i] === sequence[i + 2]) {
        return true
      }
    }
    return false
  }

  // Verificar filas y columnas
  for (let i = 0; i < dna.length; i++) {
    if (hasConsecutiveLetters(dna[i])) {
      return true
    }
  }

  for (let j = 0; j < dna[0].length; j++) {
    const column = dna.map((row) => row[j])
    if (hasConsecutiveLetters(column)) {
      return true
    }
  }

  // Verificar diagonales
  for (let i = 0; i < dna.length - 2; i++) {
    for (let j = 0; j < dna[0].length - 2; j++) {
      const diagonal = [dna[i][j], dna[i + 1][j + 1], dna[i + 2][j + 2]]
      if (hasConsecutiveLetters(diagonal)) {
        return true
      }
    }
  }

  for (let i = 0; i < dna.length - 2; i++) {
    for (let j = 2; j < dna[0].length; j++) {
      const diagonal = [dna[i][j], dna[i + 1][j - 1], dna[i + 2][j - 2]]
      if (hasConsecutiveLetters(diagonal)) {
        return true
      }
    }
  }

  return false
}
