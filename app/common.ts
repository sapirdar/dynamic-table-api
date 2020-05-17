import { ITableSchema, ITableSchemaColumn, TableSchemaColumnType } from './interfaces/tableSchema';
import { Schema, SchemaDefinition, model } from 'mongoose';

// Singltone class used for dynamic model
export class Common {

    static instance: any;
    private _schemaModel: any = null;

    constructor() {
        if (Common.instance) {
            return Common.instance;
        }
        Common.instance = this;
    }

    getModel(tableSchema: ITableSchema) {
        if (this._schemaModel != null) {
            return this._schemaModel;
        } else {
            return this.createMongoModel(tableSchema);
        }
    }

    createMongoModel(tableSchema: ITableSchema): any {
        // Resigter schema if hasn't neen desined before 
        // Create dynamic schema from tableSchema
        const schema = new Schema(this.createMongoSchema(tableSchema), { strict: false });
        this._schemaModel = this._schemaModel || model(tableSchema.shcemaName, schema);
        module.exports = this._schemaModel;
        return this._schemaModel;
    }
    // Convert ITableData type into a dynamic mongoos schema 
    createMongoSchema(tableData: ITableSchema): Schema {
        let schemaObj: SchemaDefinition = {};
        tableData.columns.forEach((col: ITableSchemaColumn) => {
            const fieldName = col.name.replace(" ", "_");
            const fieldOptions = { type: this.getMongoType(col.type) };
            schemaObj[fieldName] = fieldOptions
        });
        console.log(schemaObj);
        return new Schema(schemaObj, { strict: false });
    }

    getMongoType(colType: string) {
        switch (colType) {
            case TableSchemaColumnType.text:
                return String;
            case TableSchemaColumnType.date:
                return Date;
            case TableSchemaColumnType.actionButtons:
                return [String];
            default:
                return Object;
        }
    }
}
