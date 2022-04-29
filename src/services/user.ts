import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import constants from '../common/constants';

import snakecaseKeys from 'snakecase-keys';
import { UserRepository } from '../repositories';
import { ServiceReturnVal, RequestParams, TokenUser } from '../common/custom_types';
import { RespError } from '../common/arrow_response';
import { Knex } from 'knex';
import utility from '../common/utility';
import { TableUtility } from '../common/tbl_utility';
import { TblRole, TblUser } from '../db/tables';

export default class UserService {
  private userRepo = new UserRepository();

  public async login(params: RequestParams): Promise<ServiceReturnVal<any>> {
    const returnVal: ServiceReturnVal<any> = {};

    try {
      const user = await this.userRepo.loginByUsername(params.username);
      if (user != null) {
        const match = await bycrpt.compare(params.password, user.password!);
        if (match) {
          var tokenData: TokenUser = {
            id: user.id,
            fullName: user.full_name,
            username: user.username,
            email: user.email,
            roleId: user.role_id,
            role: user.role,
            isAdmin: (user.role as string).toLowerCase() == constants.ADMIN ? true : false,
            profileUrl: user.profile_url || null,
          };

          //Remove this code when Role & Permissions are implemented
          if ((user.role as string).toLocaleLowerCase() == constants.ADMIN) {
            tokenData.isAdmin = true;
          }

          const token = jwt.sign(tokenData, process.env.JWT!);
          user.token = token;
          delete user.password;
          returnVal.data = user;
        } else {
          returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_401, constants.ERROR_MESSAGES.INVALID_PASSWORD);
          return returnVal;
        }
      } else {
        returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_401, constants.ERROR_MESSAGES.USER_NOT_FOUND);
        return returnVal;
      }
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
      return returnVal;
    }
    return returnVal;
  }

  public async list(params: RequestParams, _user: TokenUser): Promise<ServiceReturnVal<any>> {
    const returnVal: ServiceReturnVal<any> = {};
    try {
      const tbls = TableUtility.instance(TblUser.name, TblRole.name);

      const pagination = utility.pagination(params.page, params.limit);
      const columns = [
        tbls.users.cols.id,
        tbls.users.cols.fullName,
        tbls.users.cols.email,
        tbls.users.cols.username,
        tbls.roles.cols.name,
        tbls.users.cols.createdAt,
      ];
      const where = (qb: Knex.QueryBuilder) => {
        if (!utility.isEmpty(params.search)) {
          qb.where(function () {
            this.where(tbls.users.cols.fullName, 'ilike', `%${params.search}%`)
              .orWhere(tbls.users.cols.username, 'ilike', `%${params.search}%`)
              .orWhere(tbls.users.cols.email, 'ilike', `%${params.search}%`)
              .orWhere(tbls.roles.cols.name, 'ilike', `%${params.search}%`);
          });
        }
        qb.whereNull(tbls.users.cols.deletedAt);
      };

      returnVal.data = await this.userRepo.findWithRole(
        where,
        columns,
        [{ column: tbls.users.cols.fullName, order: constants.ENUMS.ORDER.ASC }],
        pagination
      );
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
    }
    return returnVal;
  }

  public async getUserDetail(userId: String): Promise<ServiceReturnVal<any>> {
    const returnVal: ServiceReturnVal<any> = {};
    try {
      const tbls = TableUtility.instance(TblUser.name, TblRole.name);

      const columns = [
        tbls.users.cols.id,
        tbls.users.cols.fullName,
        tbls.users.cols.email,
        tbls.users.cols.username,
        tbls.roles.cols.name,
        tbls.users.cols.createdAt,
      ];
      const where = (qb: Knex.QueryBuilder) => {
        qb.where(tbls.users.cols.id, userId);
        qb.whereNull(tbls.users.cols.deletedAt);
      };

      const result = await this.userRepo.findWithRole(
        where,
        columns,
        [{ column: tbls.users.cols.fullName, order: constants.ENUMS.ORDER.ASC }],
        undefined
      );

      returnVal.data = result[0];
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
    }
    return returnVal;
  }

  public async create(params: RequestParams): Promise<ServiceReturnVal<any>> {
    const returnVal: ServiceReturnVal<any> = {};
    try {
      const check = await this.userRepo.findFirst((qb: Knex.QueryBuilder) => {
        qb.where('username', 'ilike', params.username);
      });
      if (!check) {
        const data = await this.userRepo.insert(snakecaseKeys(params));
        returnVal.data = data;
      } else {
        returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_422, constants.ERROR_MESSAGES.USER_ALREADY_EXISTS);
        return returnVal;
      }
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
    }
    return returnVal;
  }

  public async updateUser(params: RequestParams): Promise<ServiceReturnVal<any>> {
    const returnVal: ServiceReturnVal<any> = {};
    try {
      const check = await this.userRepo.validateById(params.id);
      if (check) {
        const data: RequestParams = {};

        if (!utility.isEmpty(params.fullName)) {
          data.fullName = params.fullName;
        }

        if (!utility.isEmpty(params.email)) {
          data.email = params.email;
        }

        const result = await this.userRepo.updateById(snakecaseKeys(data), params.id);
        returnVal.data = result;
      } else {
        returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_422, constants.ERROR_MESSAGES.USER_NOT_FOUND);
        return returnVal;
      }
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
    }
    return returnVal;
  }
}
