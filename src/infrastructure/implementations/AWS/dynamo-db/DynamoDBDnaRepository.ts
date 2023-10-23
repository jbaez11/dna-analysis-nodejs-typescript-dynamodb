import { type Dna } from '../../../../domain/entities/Dna'
import { type DnaRepository } from '../../../../domain/repositories/DnaRepository'
import { DynamoDB } from '../../../driven-adapters/AWS/dynamo-db'
import { marshall } from '@aws-sdk/util-dynamodb'

export class DynamoDBDnaRepository implements DnaRepository {
  private readonly _db = DynamoDB.getInstance()

  async getAll (): Promise<Dna[]> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: 'ENTITY_TYPE = :entity',
      ExpressionAttributeValues: {
        ':entity': {
          S: 'DNA'
        }
      }
    }).promise()

    const items = (response.Items != null) ? response.Items : []

    const dnas = items.map((item: any) => {
      const id: string = item['DATA-PK'].S ?? ''
      const dna: any[] = item.dna.L ?? ''
      const result: string = item.result.S ?? ''

      return {
        id: id.split('-')[1],
        dna,
        result
      }
    })
    return dnas
  }

  async save (dna: Dna): Promise<Dna> {
    const dataToInsert = JSON.stringify(dna.dna)
    console.log(dataToInsert)
    await this._db.putItem({
      TableName: DynamoDB.TABLE_NAME,
      Item: {
        'DATA-PK': {
          S: `DNA_${dna.id}`
        },
        'DATA-SK': {
          S: `DNA_${dna.id}`
        },
        ENTITY_TYPE: {
          S: 'DNA'
        },
        dna: marshall(dataToInsert),
        result: {
          S: dna.result
        }
      }
    }).promise()
    return dna
  }
}
