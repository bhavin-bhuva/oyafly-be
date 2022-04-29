import constants from '../common/constants';
import { BlogRepository } from '../repositories';
import { ServiceReturnVal, RequestParams, TokenUser } from '../common/custom_types';
import { RespError } from '../common/arrow_response';
import { Knex } from 'knex';
import utility from '../common/utility';
import { TableUtility } from '../common/tbl_utility';
import { TblBlog, TblUser } from '../db/tables';

export default class BlogService {
  private blogRepo = new BlogRepository();

  public async create(params: RequestParams, user: TokenUser): Promise<ServiceReturnVal<any>> {
    const returnVal: ServiceReturnVal<any> = {};
    try {
      return await this.insertOrUpdate(params, user);
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
      return returnVal;
    }
  }

  public async update(params: RequestParams, user: TokenUser): Promise<ServiceReturnVal<any>> {
    let returnVal: ServiceReturnVal<any> = {};
    try {
      const tbls = TableUtility.instance(TblBlog.name);
      let blog = await this.blogRepo.findFirst((qb: Knex.QueryBuilder) => {
        qb.where(tbls.blogs.cols.id, params.id).whereNull(tbls.blogs.cols.deletedAt);
      });
      if (!utility.isEmpty(blog)) {
        return this.insertOrUpdate(params, user);
      } else {
        returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_404, constants.ERROR_MESSAGES.INQUIRE_NOT_FOUND);
      }
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
    }
    return returnVal;
  }

  public async list(params: RequestParams): Promise<ServiceReturnVal<any>> {
    const returnVal: ServiceReturnVal<any> = {};
    try {
      const tbls = TableUtility.instance(TblBlog.name, TblUser.name);

      const pagination = utility.pagination(params.page, params.limit);
      const columns = [
        tbls.blogs.cols.id,
        tbls.blogs.cols.title,
        tbls.blogs.cols.category,
        tbls.blogs.cols.content,
        tbls.blogs.cols.createdAt,
        tbls.users.colAlias.id,
        tbls.users.colAlias.fullName,
        tbls.users.colAlias.email,
      ];
      const where = (qb: Knex.QueryBuilder) => {
        if (!utility.isEmpty(params.search)) {
          qb.where(function () {
            this.where(tbls.blogs.cols.title, 'ilike', `%${params.search}%`).orWhere(
              tbls.blogs.cols.category,
              'ilike',
              `%${params.search}%`
            );
          });
        }
        qb.whereNull(tbls.blogs.cols.deletedAt);
      };

      returnVal.data = await this.blogRepo.findWithUser(
        where,
        columns,
        [{ column: tbls.blogs.cols.createdAt, order: constants.ENUMS.ORDER.DESC }],
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
      const tbls = TableUtility.instance(TblBlog.name);
      if (user.isAdmin) {
        let blog = await this.blogRepo.findFirst((qb: Knex.QueryBuilder) => {
          qb.where(tbls.blogs.cols.id, params.id).whereNull(tbls.blogs.cols.deletedAt);
        });
        if (!utility.isEmpty(blog)) {
          const blogRes = await this.blogRepo.deleteById(params.id);
          returnVal.data = blogRes;
        } else {
          returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_404, constants.ERROR_MESSAGES.BLOG_NOT_FOUND);
        }
      } else {
        returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_401, constants.ERROR_MESSAGES.NOT_PERMITED);
      }
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
    }
    return returnVal;
  }

  protected async insertOrUpdate(params: RequestParams, user: TokenUser): Promise<ServiceReturnVal<any>> {
    const returnVal: ServiceReturnVal<any> = {};
    try {
      const tbls = TableUtility.instance(TblBlog.name);
      const blogValues: RequestParams = {
        [tbls.blogs.ins.category]: params.category,
      };

      if (!utility.isEmpty(params.title)) {
        blogValues[tbls.blogs.ins.title] = params.title;
      }

      if (!utility.isEmpty(params.category)) {
        blogValues[tbls.blogs.ins.category] = params.category;
      }

      if (!utility.isEmpty(params.content)) {
        blogValues[tbls.blogs.ins.content] = params.content;
      }

      if (!utility.isEmpty(params.userId)) {
        blogValues[tbls.blogs.ins.userId] = params.userId;
      }

      let blog = undefined;
      if (utility.isEmpty(params.id)) {
        blogValues[tbls.blogs.ins.userId] = user.id;
        blog = (await this.blogRepo.insert(blogValues))[0];
      } else {
        blog = (await this.blogRepo.updateById(blogValues, params.id))[0];
      }

      returnVal.data = blog;
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
      return returnVal;
    }
    return returnVal;
  }
}
