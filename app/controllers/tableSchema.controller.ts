import { Request, Response } from 'express';
import { ITableSchema } from '../interfaces/tableSchema';
import { TableSchemaDal } from '../dal/tableSchema.dal';

export class TableSchemaController {
  private tableSchemasDal = new TableSchemaDal();

  /**
 * Get schema from tableSchema collection
 * @param {string} req.params.schemaName
 */
  get = async (req: Request, res: Response) => {
    try {
      const schemaName: string = req.params.schemaName;
      this.tableSchemasDal.get(schemaName).then((data: ITableSchema | null) => {
        if (data !== null) {
          res.status(200).json(data);
        } else {
          res.status(404).send();
        }
      }).catch((error) => {
        res.status(500).json({ error: error.message });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  /**
   * Create new schema
   * @param {ITableSchema} req.body - The schema to insert into schema collection.
   */
  create = async (req: any, res: Response) => {
    try {
      const tableSchema: ITableSchema = req.body as ITableSchema;
      this.tableSchemasDal.create(tableSchema).then((createdTableSchema: ITableSchema | null) => {
        if (createdTableSchema) {
          res.status(200).json(createdTableSchema);
        } else {
          res.status(500).send();
        }
      }).catch((error) => {
        res.status(500).json({
          error: error.message
        });
      });
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  };
}