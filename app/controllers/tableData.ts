import { NextFunction, Request, Response } from 'express';
import * as uuidv4 from 'uuid/v4';
import { ITableSchema } from '../interfaces/tableSchema';
import { TableSchemaDal } from '../dal/tableSchemaDal';
import { TableDataDal } from '../dal/tableDataDal';
import { Common } from '../common';

const sharp = require('sharp');
const fs = require('fs');


export class TableDataController {
  
  tableDataDal = new TableDataDal();
  get = async (req: any, res: Response, next: NextFunction) => {
    try {
      const skip: number = parseInt(req.params.skip);
      const limit: number = parseInt(req.params.limit);

      const jsonObj: ITableSchema = this.getJson();
      this.tableDataDal.getData('promotions', skip, limit).then((data) => {
        res.status(200).json(data);
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

  create = async (req: any, res: Response, next: NextFunction) => {
    try {
      const data = this.generateData();
      this.tableDataDal.insertData('promotions', data).then((success: boolean) => {
        if (success) {
          res.status(200).json('success');
        } else {
          res.status(500).json('failed');
        }
      });

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  };

  // Generate data randomly
  private generateData(): object[] {
    let data = [];
    let types = ['Basic', 'Common', 'Epic']
    for (let i = 1; i <= 10000; i++) {
      const sDate = new Date();
      sDate.setDate(sDate.getDate() + i);
      const eDate = new Date();
      eDate.setDate(eDate.getDate() + i + 7);

      data.push({
        Promotion_Name: 'Promotion ' + i,
        Type: types[Math.floor(Math.random() * 2)],
        Start_Date: sDate,
        End_Date: eDate,
        User_Group_Name: 'UserGroup ' + i,
        Actions_Button: ['Edit', 'Delete', 'Duplicate']
      });
    }
    return data;
  }


  getJson() {
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





