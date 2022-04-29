import knex from '../common/knex';
import { TblUser, TblRole } from '../db/tables';
import { Pagination } from '../common/custom_types';
import { TableUtility } from '../common/tbl_utility';
import BaseRepository from './base';

export default class UserRepository extends BaseRepository {
  constructor() {
    super(new TblUser());
  }

  public async findWithRole(
    where: object | undefined = undefined,
    columns: Array<any> = Array<any>(),
    orderBy: Array<any> = Array<any>(),
    pagination: Pagination | undefined = undefined
  ): Promise<Array<any>> {
    const tbls = TableUtility.instance(TblRole.name);
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

    query.leftJoin(tbls.roles.name, tbls.roles.cols.id, this.table.cols.roleId);

    return await query.select();
  }

  public async loginByUsername(username: string): Promise<any | undefined> {
    const tbls = TableUtility.instance(TblUser.name, TblRole.name);
    const fields = [
      tbls.users.cols.id,
      tbls.users.cols.fullName,
      tbls.users.cols.password,
      tbls.users.cols.email,
      tbls.users.cols.roleId,
      `${tbls.roles.cols.name} as role`,
    ];
    return await knex(tbls.users.name)
      .select(fields)
      .leftJoin(tbls.roles.name, tbls.roles.cols.id, tbls.users.cols.roleId)
      .whereRaw(`LOWER(${tbls.users.cols.username}) = LOWER(?)`, [username])
      .whereNull(tbls.users.cols.deletedAt)
      .first();
  }
}
