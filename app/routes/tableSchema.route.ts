import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { TableSchemaController } from '../controllers/tableSchema.controller';

const tableSchemaRouter: Router = express.Router();
const tableSchemaCtrl = new TableSchemaController();

tableSchemaRouter.use(bodyParser.json());
tableSchemaRouter.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes
tableSchemaRouter.get('/:schemaName', tableSchemaCtrl.get);
tableSchemaRouter.post('/', tableSchemaCtrl.create);

export { tableSchemaRouter }