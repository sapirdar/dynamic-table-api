import { NextFunction, Request, Response } from 'express';
import { ITableSchema } from '../interfaces/tableSchema';
import { TableSchemaDal } from '../dal/tableSchemaDal';

const sharp = require('sharp');
const fs = require('fs');


export class TableSchemaController {
  tableSchemasDal = new TableSchemaDal();

  get = async (req: any, res: Response) => {
    try {
      const schemaName: string = req.params.schemaName;
      this.tableSchemasDal.get(schemaName).then((data: ITableSchema | null) => {
        if(data!==null)
        {
          res.status(200).json(data);
        }else{
          res.status(404).send();
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

  create = async (req: any, res: Response) => {
    try {
      const jsonObj: ITableSchema = this.getJson();
      this.tableSchemasDal.create('promotions', jsonObj).then((tableSchema: ITableSchema | null) => {
        if (tableSchema) {
          res.status(200).json(tableSchema);
        } else {
          res.status(500).send();
        }
      });
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  };

  private getJson() {
    return {
      "shcemaName": "promotions",
      "columns": [
        {
          "name": "Promotion Name",
          "type": "text"
        },
        {
          "name": "Type",
          "type": "text"
        },
        {
          "name": "Start Date",
          "type": "date"
        },
        {
          "name": "End Date",
          "type": "date"
        },
        {
          "name": "User Group Name",
          "type": "text"
        },
        {
          "name": "Actions Button",
          "type": "actionButtons",
        }
      ]
    };
  }

}