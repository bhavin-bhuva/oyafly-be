import { RequestParams } from '../../common/custom_types';
import { BaseTable } from './base';

export default class TblInquire implements BaseTable {
  name: string;
  cols: RequestParams;
  ins: RequestParams;
  alias: RequestParams;
  colAlias: RequestParams;
  prefix: string;

  constructor() {
    this.name = 'tbl_inquiries';
    this.prefix = 'inquiries_';
    this.alias = {};
    this.colAlias = {};
    this.cols = {
      id: `${this.name}.id`,
      name: `${this.name}.name`,
      surname: `${this.name}.surname`,
      comment: `${this.name}.comment`,
      email: `${this.name}.email`,
      department: `${this.name}.department`,
      createdAt: `${this.name}.created_at`,
      updatedAt: `${this.name}.updated_at`,
      deletedAt: `${this.name}.deleted_at`,
    };
    this.ins = {
      id: `id`,
      name: `name`,
      surname: `surname`,
      comment: `comment`,
      email: `email`,
      department: `department`,
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
