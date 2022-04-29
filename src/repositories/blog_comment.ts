import { TblBlogComment, TblUser } from '../db/tables';
import BaseRepository from './base';
import { TableUtility } from '../common/tbl_utility';
import { Pagination } from '../common/custom_types';
import knex from '../common/knex';

export default class blogCommentRepository extends BaseRepository {
  constructor() {
    super(new TblBlogComment());
  }

  public async findWithUser(
    where: object | undefined = undefined,
    columns: Array<any> = Array<any>(),
    orderBy: Array<any> = Array<any>(),
    pagination: Pagination | undefined = undefined
  ): Promise<Array<any>> {
    const tbls = TableUtility.instance(TblUser.name);
    const query = knex(this.table.name);
    if (where) {
      query.where(where);
    }

    if (columns.length > 0) {
      query.column(columns);
    }

    if (orderBy.length > 0) {
      query.orderBy(orderBy);
    }

    if (pagination) {
      query.offset(pagination.offset).limit(pagination.limit);
    }

    query.leftJoin(tbls.users.name, tbls.users.cols.id, this.table.cols.userId);

    return await query.select();
  }
}
