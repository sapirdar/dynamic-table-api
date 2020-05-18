import { ITableSchema } from '../interfaces/tableSchema';
import { TableSchema } from '../schemas/tableSchema';

export class TableSchemaDal {

  /**
* Insert new tableSchema
* @param {ITableSchema} tableSchema
*/
  create = (tableSchema: ITableSchema): Promise<ITableSchema> => {
    const newTableSchema = new TableSchema(tableSchema);
    return newTableSchema.save();
  };

  /**
   * Get tableSchema by name
   * @param {string} shcemaName name is unique in collection
   */
  get = async (schemaName: string): Promise<ITableSchema | null> => {
    return TableSchema.findOne({ shcemaName: schemaName });
  }

}
