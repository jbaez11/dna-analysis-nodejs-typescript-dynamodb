import path from 'path'
import * as dotenv from 'dotenv'
import { DnaAnalysisApi } from './DnaAnalysisApi'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })

  new DnaAnalysisApi().start()
} catch (error) {
  console.log(error)
}
