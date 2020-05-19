import { Schema, Model, model, Document } from 'mongoose';
import mongooseUniqueValidator = require("mongoose-unique-validator");
import { ITableSchema, ITableSchemaColumn } from '../interfaces/tableSchema';

export interface ITableSchemaModel extends ITableSchema, Document {
}

export var TableSchemaSchema: Schema = new Schema({
    columns: [Object],
    shcemaName: { type: String, unique: true, required: true }
});

TableSchemaSchema.plugin(mongooseUniqueValidator)
export const TableSchema: Model<ITableSchemaModel> = model<ITableSchemaModel>("TableSchema", TableSchemaSchema);

