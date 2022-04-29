import { Request, Response } from 'express';
import { ArrowResponse, RespError } from '../common/arrow_response';

import BlogService from '../services/blog';
import Blog from '../validations/common/blog';
import appFunctions from '../common/app_functions';

export default class BlogController {
  private blogService = new BlogService();
  private resp = new ArrowResponse();

  public async create(request: Request, response: Response) {
    const valSchema = new Blog().getVS(false);
    const result = await appFunctions.validateSchema(valSchema, request.body);
    if (result.status) {
      const currentUser = response.locals.decoded.user;
      const user = await this.blogService.create(request.body, currentUser);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async update(request: Request, response: Response) {
    const valSchema = new Blog().getVS(true);
    const result = await appFunctions.validateSchema(valSchema, request.body);
    if (result.status) {
      const currentUser = response.locals.decoded.user;
      const user = await this.blogService.update(request.body, currentUser);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async list(request: Request, response: Response) {
    const valSchema = new Blog().getListVs();
    const result = await appFunctions.validateSchema(valSchema, request.query);
    if (result.status) {
      const user = await this.blogService.list(request.query);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async delete(request: Request, response: Response) {
    const currentUser = response.locals.decoded.user;
    const user = await this.blogService.delete(request.params, currentUser);
    this.resp.resp(response).send(user);
  }
}
