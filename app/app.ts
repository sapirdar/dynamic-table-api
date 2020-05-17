import express from 'express';
import { tableSchemaRouter } from './routes/tableSchema';
import dotenv from "dotenv";
import { tableDataRouter } from './routes/tableData';

require('newrelic');
var bodyParser = require('body-parser');
const path = require('path');
const config = require('./config/config.' + process.env.NODE_ENV);
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');


try {
  // initialize configuration
  dotenv.config();

  const app = express();

  app.use('/api/tableSchema', tableSchemaRouter);
  app.use('/api/tableData', tableDataRouter);

  // connect to our mongoDB database 
  const mongoose = require('mongoose');
  mongoose.connect(config.dbUrl)
    .then(() => {
      console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error: string) => {
      console.log('Unable to connect to MongoDB Atlas!');
      console.error(error);
    });

  const port = process.env.PORT || '5000';
  app.listen(port, function () {
    console.log(config.clientUrl);
    console.log('Example app listening on port ' + port, 'env=' + process.env.NODE_ENV);
  });

  module.exports = app;
} catch (error) {
  console.error(error);
}