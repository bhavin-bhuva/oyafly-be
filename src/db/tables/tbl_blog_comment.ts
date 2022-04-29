import { RequestParams } from '../../common/custom_types';
import { BaseTable } from './base';

export default class TblBlogComment implements BaseTable {
  name: string;
  cols: RequestParams;
  ins: RequestParams;
  alias: RequestParams;
  colAlias: RequestParams;
  prefix: string;

  constructor() {
    this.name = 'tbl_blog_comments';
    this.prefix = 'blog_comment_';
    this.alias = {};
    this.colAlias = {};
    this.cols = {
      id: `${this.name}.id`,
      name: `${this.name}.name`,
      email: `${this.name}.email`,
      comment: `${this.name}.comment`,
      userId: `${this.name}.user_id`,
      blogId: `${this.name}.blog_id`,
      createdAt: `${this.name}.created_at`,
      updatedAt: `${this.name}.updated_at`,
      deletedAt: `${this.name}.deleted_at`,
    };
    this.ins = {
      id: `id`,
      name: `name`,
      email: `email`,
      comment: `comment`,
      userId: `user_id`,
      blogId: `blog_id`,
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
