import { RequestParams } from '../../common/custom_types';
import { BaseTable } from './base';

export default class TblRole implements BaseTable {
  name: string;
  cols: RequestParams;
  ins: RequestParams;
  alias: RequestParams;
  colAlias: RequestParams;
  prefix: string;

  constructor() {
    this.name = 'tbl_roles';
    this.prefix = 'role_';
    this.alias = {};
    this.colAlias = {};
    this.cols = {
      id: `${this.name}.id`,
      name: `${this.name}.name`,
      createdAt: `${this.name}.created_at`,
      updatedAt: `${this.name}.updated_at`,
      deletedAt: `${this.name}.deleted_at`,
    };
    this.ins = {
      id: `id`,
      name: `name`,
      createdAt: `created_at`,
      updatedAt: `updated_at`,
      deletedAt: `deleted_at`,
    };
    Object.keys(this.ins).map((key) => {
      this.alias[key] = `${this.prefix}${this.ins[key]}`;
    });
    Object.keys(this.ins).map((key) => {
      this.colAlias[key] = `${this.cols[key]} as ${this.prefix}${this.ins[key]}`;
    });
  }
}
