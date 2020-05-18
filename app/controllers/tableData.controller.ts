import { NextFunction, Request, Response } from 'express';
import { TableDataDal } from '../dal/tableData.dal';

export class TableDataController {

  tableDataDal = new TableDataDal();

  /**
   * Get collenction data
   * @param {number} req.params.skip - skip n items for paging.
   * @param {number} req.params.limit - limit items for paging.
   * @param {string} req.params.schemaName - schemaName to select from.
   */
  get = async (req: any, res: Response) => {
    try {
      const skip: number = parseInt(req.params.skip);
      const limit: number = parseInt(req.params.limit);
      const schemaName: string = req.params.schemaName;

      this.tableDataDal.getData(schemaName, skip, limit).then((data) => {
        res.status(200).json(data);
      }).catch((error) => {
        res.status(500).json({ error: error.message });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  /**
   * Generate 10,000 items for 'promotions' schema and insert to collection
   */
  create = async (req: any, res: Response) => {
    try {
      const data = this.generatePromotionsData();
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

  // Generate 'promotions' data randomly
  private generatePromotionsData(): object[] {
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

}





