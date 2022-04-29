import constants from '../common/constants';
import { BlogCommentRepository } from '../repositories';
import { ServiceReturnVal, RequestParams, TokenUser } from '../common/custom_types';
import { RespError } from '../common/arrow_response';
import { Knex } from 'knex';
import utility from '../common/utility';
import { TableUtility } from '../common/tbl_utility';
import { TblBlog, TblUser, TblBlogComment } from '../db/tables';

export default class BlogCommentService {
  private blogCmntRepo = new BlogCommentRepository();

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
      const tbls = TableUtility.instance(TblBlogComment.name);
      let blogCmnt = await this.blogCmntRepo.findFirst((qb: Knex.QueryBuilder) => {
        qb.where(tbls.blogComments.cols.id, params.id).whereNull(tbls.blogComments.cols.deletedAt);
      });
      if (!utility.isEmpty(blogCmnt)) {
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
      const tbls = TableUtility.instance(TblBlog.name, TblUser.name, TblBlogComment.name);

      const pagination = utility.pagination(params.page, params.limit);
      const columns = [
        tbls.blogComments.cols.id,
        tbls.blogComments.cols.name,
        tbls.blogComments.cols.email,
        tbls.blogComments.cols.comment,
        tbls.blogComments.cols.createdAt,
        tbls.users.colAlias.id,
        tbls.users.colAlias.fullName,
        tbls.users.colAlias.email,
      ];
      const where = (qb: Knex.QueryBuilder) => {
        qb.whereNull(tbls.blogComments.cols.deletedAt).where(tbls.blogComments.cols.blogId, params.blogId);
      };

      returnVal.data = await this.blogCmntRepo.findWithUser(
        where,
        columns,
        [{ column: tbls.blogComments.cols.createdAt, order: constants.ENUMS.ORDER.DESC }],
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
      const tbls = TableUtility.instance(TblBlogComment.name);
      if (user.isAdmin) {
        let blog = await this.blogCmntRepo.findFirst((qb: Knex.QueryBuilder) => {
          qb.where(tbls.blogComments.cols.id, params.id).whereNull(tbls.blogComments.cols.deletedAt);
        });
        if (!utility.isEmpty(blog)) {
          const blogRes = await this.blogCmntRepo.deleteById(params.id);
          returnVal.data = blogRes;
        } else {
          returnVal.error = new RespError(
            constants.RESP_ERR_CODES.ERR_404,
            constants.ERROR_MESSAGES.BLOG_COMMENT_NOT_FOUND
          );
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
      const blogValues: RequestParams = {};
      const tbls = TableUtility.instance(TblBlogComment.name);

      if (!utility.isEmpty(params.name)) {
        blogValues[tbls.blogComments.ins.name] = params.name;
      }

      if (!utility.isEmpty(params.email)) {
        blogValues[tbls.blogComments.ins.email] = params.email;
      }

      if (!utility.isEmpty(params.comment)) {
        blogValues[tbls.blogComments.ins.comment] = params.comment;
      }

      if (!utility.isEmpty(params.userId)) {
        blogValues[tbls.blogComments.ins.userId] = params.userId;
      }

      if (!utility.isEmpty(params.blogId)) {
        blogValues[tbls.blogComments.ins.blogId] = params.blogId;
      }

      let blog = undefined;
      if (utility.isEmpty(params.id)) {
        blogValues[tbls.blogComments.ins.userId] = user.id;
        blog = (await this.blogCmntRepo.insert(blogValues))[0];
      } else {
        blog = (await this.blogCmntRepo.updateById(blogValues, params.id))[0];
      }

      returnVal.data = blog;
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
      return returnVal;
    }
    return returnVal;
  }
}
