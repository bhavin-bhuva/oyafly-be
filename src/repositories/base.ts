import { Pagination } from '../common/custom_types';
import knex from '../common/knex';
import { BaseTable } from '../db/tables/base';

export default abstract class BaseRepository {
  protected table: BaseTable;

  constructor(table: BaseTable) {
    this.table = table;
  }

  public async insert(record: object, columns: Array<string> = Array<string>()): Promise<any> {
    const returning: Array<string> | string = columns.length > 0 ? columns : '*';
    return await knex(this.table.name).insert(record).returning(returning);
  }

  public async bulkInsert(assets: Array<object>): Promise<any> {
    return await knex.batchInsert(this.table.name, assets, 30).returning('*');
  }

  public async update(record: any, where: object, columns: Array<string> = Array<string>()): Promise<Array<any>> {
    const returning: Array<string> | string = columns.length > 0 ? columns : '*';
    record[this.table.ins.updatedAt] = knex.fn.now();
    return await knex(this.table.name).where(where).update(record).returning(returning);
  }

  public async deleteById(id: string, softDelete: boolean = true): Promise<any> {
    const query = knex(this.table.name).where(this.table.ins.id, id);
    if (softDelete) {
      return await query.update({ [this.table.ins.deletedAt]: knex.fn.now() });
    } else {
      return await query.delete();
    }
  }

  public async delete(where: object, softDelete: boolean = true): Promise<any> {
    const query = knex(this.table.name).where(where);
    if (softDelete) {
      return await query.update({ [this.table.ins.deletedAt]: knex.fn.now() });
    } else {
      return await query.delete();
    }
  }

  public async distinct(
    column: Array<any>,
    where: object | undefined = undefined,
    orderBy: Array<any> = Array<any>()
  ): Promise<Array<any>> {
    const query = knex(this.table.name);

    if (where) {
      query.where(where);
    }

    if (orderBy.length > 0) {
      query.orderBy(orderBy);
    }

    return await query.distinct(column);
  }

  public async find(
    where: object | undefined = undefined,
    columns: Array<any> = Array<any>(),
    orderBy: Array<any> = Array<any>(),
    pagination: Pagination | undefined = undefined
  ): Promise<Array<any>> {
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

    return await query.select();
  }

  public async findFirst(
    where: object | undefined = undefined,
    columns: Array<any> = Array<any>(),
    orderBy: Array<any> = Array<any>()
  ): Promise<any> {
    const query = knex(this.table.name).first();
    if (where) {
      query.where(where);
    }

    if (columns.length > 0) {
      query.column(columns);
    }

    if (orderBy.length > 0) {
      query.orderBy(orderBy);
    }

    return await query.select();
  }

  public async findById(recordId: string): Promise<any> {
    return await knex(this.table.name).where(this.table.cols.id, recordId).first();
  }

  public async validateById(recordId: string): Promise<any> {
    return await knex(this.table.name).where(this.table.cols.id, recordId).whereNull(this.table.cols.deletedAt).first();
  }

  public async count(where: object): Promise<number> {
    const result = await knex(this.table.name).count('id').where(where);
    if (result.length > 0) {
      return result[0].count as number;
    }
    return 0;
  }

  public async increment(column: string, where: object): Promise<any> {
    const result = await knex(this.table.name).increment(column).where(where);
    return result;
  }

  public async raw(query: string): Promise<any> {
    return await knex.raw(query);
  }

  public async updateById(data: any, id: string, columns: Array<string> = Array<string>()): Promise<any> {
    const returning: Array<string> | string = columns.length > 0 ? columns : '*';
    data[this.table.ins.updatedAt] = knex.fn.now();
    return await knex(this.table.name)
      .where({ [this.table.ins.id]: id })
      .update(data)
      .returning(returning);
  }
}
