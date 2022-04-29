import { Request, Response } from 'express';
import { ArrowResponse, RespError } from '../common/arrow_response';

import BlogCommentService from '../services/blog_comment';
import BlogComment from '../validations/common/blog_comment';
import appFunctions from '../common/app_functions';

export default class BlogCommentController {
  private blogCommentService = new BlogCommentService();
  private resp = new ArrowResponse();

  public async create(request: Request, response: Response) {
    const valSchema = new BlogComment().getVS(false);
    const result = await appFunctions.validateSchema(valSchema, request.body);
    if (result.status) {
      const currentUser = response.locals.decoded.user;
      const user = await this.blogCommentService.create(request.body, currentUser);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async update(request: Request, response: Response) {
    const valSchema = new BlogComment().getVS(true);
    const result = await appFunctions.validateSchema(valSchema, request.body);
    if (result.status) {
      const currentUser = response.locals.decoded.user;
      const user = await this.blogCommentService.update(request.body, currentUser);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async list(request: Request, response: Response) {
    const valSchema = new BlogComment().getListVs();
    const result = await appFunctions.validateSchema(valSchema, request.query);
    if (result.status) {
      const user = await this.blogCommentService.list(request.query);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async delete(request: Request, response: Response) {
    const currentUser = response.locals.decoded.user;
    const user = await this.blogCommentService.delete(request.params, currentUser);
    this.resp.resp(response).send(user);
  }
}
