import { RequestParams } from '../../common/custom_types';
import { BaseTable } from './base';

export default class TblUser implements BaseTable {
  name: string;
  cols: RequestParams;
  ins: RequestParams;
  alias: RequestParams;
  colAlias: RequestParams;
  prefix: string;

  constructor() {
    this.name = 'tbl_users';
    this.prefix = 'user_';
    this.alias = {};
    this.colAlias = {};
    this.cols = {
      id: `${this.name}.id`,
      fullName: `${this.name}.full_name`,
      username: `${this.name}.username`,
      email: `${this.name}.email`,
      password: `${this.name}.password`,
      resetHash: `${this.name}.reset_hash`,
      roleId: `${this.name}.role_id`,
      createdAt: `${this.name}.created_at`,
      updatedAt: `${this.name}.updated_at`,
      deletedAt: `${this.name}.deleted_at`,
    };
    this.ins = {
      id: `id`,
      fullName: `full_name`,
      username: `username`,
      email: `email`,
      password: `password`,
      resetHash: `reset_hash`,
      roleId: `role_id`,
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
