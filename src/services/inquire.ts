import constants from '../common/constants';
import { InquireRepository } from '../repositories';
import { ServiceReturnVal, RequestParams, TokenUser } from '../common/custom_types';
import { RespError } from '../common/arrow_response';
import { Knex } from 'knex';
import utility from '../common/utility';
import { TableUtility } from '../common/tbl_utility';
import { TblInquire } from '../db/tables';

export default class InquireService {
  private inquireRepo = new InquireRepository();

  public async create(params: RequestParams): Promise<ServiceReturnVal<any>> {
    const returnVal: ServiceReturnVal<any> = {};
    try {
      return await this.insertOrUpdate(params);
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
      return returnVal;
    }
  }

  public async update(params: RequestParams, _user: TokenUser): Promise<ServiceReturnVal<any>> {
    let returnVal: ServiceReturnVal<any> = {};
    try {
      const tbls = TableUtility.instance(TblInquire.name);
      let inquire = await this.inquireRepo.findFirst((qb: Knex.QueryBuilder) => {
        qb.where(tbls.inquiries.cols.id, params.id).whereNull(tbls.inquiries.cols.deletedAt);
      });
      if (!utility.isEmpty(inquire)) {
        return this.insertOrUpdate(params);
      } else {
        returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_404, constants.ERROR_MESSAGES.INQUIRE_NOT_FOUND);
      }
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
    }
    return returnVal;
  }

  public async list(params: RequestParams, _user: TokenUser): Promise<ServiceReturnVal<any>> {
    const returnVal: ServiceReturnVal<any> = {};
    try {
      const tbls = TableUtility.instance(TblInquire.name);

      const pagination = utility.pagination(params.page, params.limit);
      const columns = [
        tbls.inquiries.cols.id,
        tbls.inquiries.cols.name,
        tbls.inquiries.cols.surname,
        tbls.inquiries.cols.comment,
        tbls.inquiries.cols.email,
        tbls.inquiries.cols.department,
        tbls.inquiries.cols.createdAt,
      ];
      const where = (qb: Knex.QueryBuilder) => {
        if (!utility.isEmpty(params.search)) {
          qb.where(function () {
            this.where(tbls.inquiries.cols.name, 'ilike', `%${params.search}%`)
              .orWhere(tbls.inquiries.cols.surname, 'ilike', `%${params.search}%`)
              .orWhere(tbls.inquiries.cols.email, 'ilike', `%${params.search}%`)
              .orWhere(tbls.inquiries.cols.department, 'ilike', `%${params.search}%`);
          });
        }
        qb.whereNull(tbls.inquiries.cols.deletedAt);
      };

      returnVal.data = await this.inquireRepo.find(
        where,
        columns,
        [{ column: tbls.inquiries.cols.createdAt, order: constants.ENUMS.ORDER.DESC }],
        pagination
      );
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
    }
    return returnVal;
  }

  public async delete(params: RequestParams, user: TokenUser): Promise<ServiceReturnVal<any>> {
    let returnVal: ServiceReturnVal<any> = {};
    try {
      const tbls = TableUtility.instance(TblInquire.name);
      if (user.isAdmin) {
        let inquire = await this.inquireRepo.findFirst((qb: Knex.QueryBuilder) => {
          qb.where(tbls.inquiries.cols.id, params.id).whereNull(tbls.inquiries.cols.deletedAt);
        });
        if (!utility.isEmpty(inquire)) {
          const inquireRes = await this.inquireRepo.deleteById(params.id);
          returnVal.data = inquireRes;
        } else {
          returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_404, constants.ERROR_MESSAGES.INQUIRE_NOT_FOUND);
        }
      } else {
        returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_401, constants.ERROR_MESSAGES.NOT_PERMITED);
      }
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
    }
    return returnVal;
  }

  protected async insertOrUpdate(params: RequestParams): Promise<ServiceReturnVal<any>> {
    const returnVal: ServiceReturnVal<any> = {};
    try {
      const inquireValues: RequestParams = {};
      const tbls = TableUtility.instance(TblInquire.name);

      if (!utility.isEmpty(params.name)) {
        inquireValues[tbls.inquiries.ins.name] = params.name;
      }

      if (!utility.isEmpty(params.surname)) {
        inquireValues[tbls.inquiries.ins.surname] = params.surname;
      }

      if (!utility.isEmpty(params.department)) {
        inquireValues[tbls.inquiries.ins.department] = params.department;
      }

      if (!utility.isEmpty(params.comment)) {
        inquireValues[tbls.inquiries.ins.comment] = params.comment;
      }

      if (!utility.isEmpty(params.email)) {
        inquireValues[tbls.inquiries.ins.email] = params.email;
      }

      let inquire = undefined;
      if (utility.isEmpty(params.id)) {
        inquire = (await this.inquireRepo.insert(inquireValues))[0];
      } else {
        inquire = (await this.inquireRepo.updateById(inquireValues, params.id))[0];
      }

      returnVal.data = inquire;
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
      return returnVal;
    }
    return returnVal;
  }
}
