
import { Types, Schema, model, SchemaDefinition } from 'mongoose';
import { Common } from '../common';
import { TableSchema } from '../schemas/tableSchema';
import { ITableSchema } from '../interfaces/tableSchema';


export class TableDataDal {
  private _common: Common = new Common();

  insertData = (schemaName: string, data: object[]): Promise<boolean> => {
    return TableSchema.findOne({ 'shcemaName': schemaName }).then((tableSchema: ITableSchema | null) => {
      if (tableSchema == null) {
        // Schema doesn't exits
        return Promise.resolve(false);
      } else {

        // Insert data into collection
        const schemaModel = this._common.getModel(tableSchema);
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

  getData = (schemaName: string, skip: number, limit: number): Promise<any[]> => {
    return TableSchema.findOne({ 'shcemaName': schemaName }).then((tableSchema: ITableSchema | null) => {
      if (tableSchema == null) {
        // Schema doesn't exits
        return Promise.resolve([]);
      } else {
        // Get data from collection
        const schemaModel = this._common.getModel(tableSchema);
        return schemaModel.find().sort([['_id']]).skip(skip).limit(limit);
      }
    })
  }
}
