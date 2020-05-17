import { ITableSchema, ITableSchemaColumn, TableSchemaColumnType } from '../interfaces/tableSchema';
import { TableSchema, ITableSchemaModel } from '../schemas/tableSchema';
import { Common } from '../common';

export class TableSchemaDal {
  create = (schemaName: string, tableSchema: ITableSchema): Promise<ITableSchema | null> => {
    // Create new tableSchema and save in mongo collection
    return TableSchema.remove({ shcemaName: tableSchema.shcemaName }).then(() => {
      {
        const newTableSchema = new TableSchema(tableSchema);
        return newTableSchema.save().then((createdSchema: ITableSchema) => {
          try {
            return createdSchema;
          } catch (error) {
            console.error(error);
            return null;
          }
        }).catch((error) => {
          console.error(error);
          return null;
        });
      }
    })
  };

  get = async (schemaName: string): Promise<ITableSchema | null> => {
    // Get tableSchema by name
    return TableSchema.findOne({ shcemaName: schemaName });
  }

}
