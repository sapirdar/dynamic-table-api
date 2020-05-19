import express from 'express';
import { tableSchemaRouter } from './routes/tableSchema.route';
import dotenv from "dotenv";
import { tableDataRouter } from './routes/tableData.route';

try {
  // Init configuration
  const config = require('./config/config.' + process.env.NODE_ENV);
  dotenv.config();

  // Init server
  const app = express();

  // App routes
  app.use('/api/tableSchema', tableSchemaRouter);
  app.use('/api/tableData', tableDataRouter);

  // Connect to mongoDB database 
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
    console.log('App listening on port ' + port, 'env=' + process.env.NODE_ENV);
  });

  module.exports = app;
} catch (error) {
  console.error(error);
  throw (error);
}