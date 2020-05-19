import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { TableDataController } from '../controllers/tableData.controller';

const tableDataCtrl = new TableDataController();

const tableDataRouter: Router = express.Router();

tableDataRouter.use(bodyParser.json());

tableDataRouter.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

tableDataRouter.get('/:schemaName/:skip/:limit', tableDataCtrl.get);
tableDataRouter.post('/', tableDataCtrl.create);

export { tableDataRouter }