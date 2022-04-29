import * as tables from '../db/tables';
import { BaseTable } from '../db/tables/base';
import camelcase from 'camelcase';

type TableObject<T> = { [key: string]: T };

export class TableUtility {
  private static getInstance(className: string): any {
    const mod: any = tables;
    if (typeof mod[className] !== undefined) {
      return new mod[className]();
    } else {
      throw new Error('Class not found: ' + className);
    }
  }

  public static instance(...tableNames: string[]): TableObject<BaseTable> {
    var tables: TableObject<BaseTable> = {};

    tableNames.forEach(function (tableName) {
      const table = TableUtility.getInstance(tableName);
      tables[camelcase(table.name.replace('tbl_', ''))] = table;
    });

    return tables;
  }
}
