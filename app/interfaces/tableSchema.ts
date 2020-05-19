export interface ITableSchema {
    shcemaName: string;
    columns: ITableSchemaColumn[];
}

export interface ITableSchemaColumn {
    name: string;
    type: string;
}

export interface ITableSchemaAction {
    name: string;
    type: string;
}


// Column Type - Used for casting
export enum TableSchemaColumnType {
    text = 'text',
    date = 'date',
    actionButtons = 'actionButtons',
}

// Action Type - Used for casting
export enum TableSchemaActionType {
    edit = 'edit',
    delete = 'delete',
    duplicate = 'duplicate',
}