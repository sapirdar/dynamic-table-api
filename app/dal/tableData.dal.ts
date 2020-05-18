
import { Types, Schema, model, SchemaDefinition } from 'mongoose';
import { DynamicModelService } from '../services/dynamicModel.service';
import { TableSchema } from '../schemas/tableSchema';
import { ITableSchema } from '../interfaces/tableSchema';


export class TableDataDal {
  private dynamicModelService: DynamicModelService = new DynamicModelService();

  /**
   * Insert data to a collection by schema name.
   * @param {string} schemaName - schemaName to insert data to.
   * @param {object[]} data - data to insert.
   */
  insertData = (schemaName: string, data: object[]): Promise<boolean> => {
    // Get tableSchema by name
    return TableSchema.findOne({ 'shcemaName': schemaName }).then((tableSchema: ITableSchema | null) => {
      if (tableSchema == null) {
        // Schema doesn't exits - return false as failure.
        return Promise.resolve(false);
      } else {
        // Schema exists - insert data into collection
        const schemaModel = this.dynamicModelService.getModel(tableSchema);
        return schemaModel.insertMany(data)
          .then(() => {
            return true;
          }).catch((error: any) => {
            console.error(error);
            return false;
          });
      }
    })
  }

  /**
   * Get collenction data by schema
   * @param {string} schemaName - schemaName to select from.
   * @param {number} skip - skip n items for paging.
   * @param {number} limit - limit items for paging.
   */
  getData = (schemaName: string, skip: number, limit: number): Promise<any[]> => {
    // Get tableSchema by name
    return TableSchema.findOne({ 'shcemaName': schemaName }).then((tableSchema: ITableSchema | null) => {
      if (tableSchema == null) {
        // Schema doesn't exits - return empty array
        return Promise.resolve([]);
      } else {
        // Schema exists - get data from collection
        const schemaModel = this.dynamicModelService.getModel(tableSchema);
        return schemaModel.find().sort([['_id']]).skip(skip).limit(limit);
      }
    })
  }
}
