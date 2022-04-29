import { RequestParams } from '../../common/custom_types';
import { BaseTable } from './base';

export default class TblBlog implements BaseTable {
  name: string;
  cols: RequestParams;
  ins: RequestParams;
  alias: RequestParams;
  colAlias: RequestParams;
  prefix: string;

  constructor() {
    this.name = 'tbl_blogs';
    this.prefix = 'blog_';
    this.alias = {};
    this.colAlias = {};
    this.cols = {
      id: `${this.name}.id`,
      title: `${this.name}.title`,
      category: `${this.name}.category`,
      content: `${this.name}.content`,
      userId: `${this.name}.user_id`,
      createdAt: `${this.name}.created_at`,
      updatedAt: `${this.name}.updated_at`,
      deletedAt: `${this.name}.deleted_at`,
    };
    this.ins = {
      id: `id`,
      title: `title`,
      category: `category`,
      content: `content`,
      userId: `user_id`,
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
