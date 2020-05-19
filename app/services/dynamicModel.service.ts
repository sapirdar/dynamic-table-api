import { ITableSchema, ITableSchemaColumn, TableSchemaColumnType } from '../interfaces/tableSchema';
import { Schema, SchemaDefinition, model } from 'mongoose';

// Singltone class used for dynamic mongoose model
export class DynamicModelService {
    static instance: any;
    private _schemaModel: any = null;

    constructor() {
        if (DynamicModelService.instance) {
            return DynamicModelService.instance;
        }
        DynamicModelService.instance = this;
    }

    /**
     * Get mongoose registered schema model.
     * @param {ITableSchema} tableSchema - schema to get model from.
     */
    getModel(tableSchema: ITableSchema) {
        if (this._schemaModel != null) {
            // Schrma model is already registered - return existing instance
            return this._schemaModel;
        } else {
            // Schema model hasn't been registered - create and registere new one
            return this.createMongoModel(tableSchema);
        }
    }

    /**
     * Create mongoose schema model.
     * @param {ITableSchema} tableSchema - schema to create mongoos schema model from.
     */
    private createMongoModel(tableSchema: ITableSchema): any {
        const schema = new Schema(this.createMongoSchema(tableSchema), { strict: false });
        this._schemaModel = model(tableSchema.shcemaName, schema);
        // Register model
        module.exports = this._schemaModel;
        return this._schemaModel;
    }

    /**
     * Convert ITableData type into a dynamic mongoos schema 
     * @param {ITableSchema} tableSchema - schema to create mongoos schema model from.
     */
    private createMongoSchema(tableSchema: ITableSchema): Schema {
        let schemaObj: SchemaDefinition = {};
        // Loop columns in tableSchema and build the fields in SchemaDefinition for collection
        tableSchema.columns.forEach((col: ITableSchemaColumn) => {
            const fieldName = col.name.replace(" ", "_");
            const fieldOptions = { type: this.getMongoType(col.type) };
            schemaObj[fieldName] = fieldOptions
        });
        return new Schema(schemaObj, { strict: false });
    }

    /**
     * Convert TableSchemaColumnType enum to a mongodb field type
     * @param {string} colType - schema to create mongoos schema model from.
     */
    private getMongoType(colType: string) {
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
