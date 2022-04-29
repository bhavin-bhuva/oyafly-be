import { Request, Response } from 'express';
import { ArrowResponse, RespError } from '../common/arrow_response';

import UserService from '../services/user';
import User from '../validations/common/user';
import appFunctions from '../common/app_functions';

import { RequestParams } from '../common/custom_types';

export default class UserController {
  private userService = new UserService();
  private resp = new ArrowResponse();

  public async create(request: Request, response: Response) {
    const valSchema = new User().getCreateVS(false);
    const result = await appFunctions.validateSchema(valSchema, request.body);
    if (result.status) {
      const user = await this.userService.create(request.body);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async update(request: Request, response: Response) {
    const valSchema = new User().getCreateVS(true);
    const result = await appFunctions.validateSchema(valSchema, request.body);
    if (result.status) {
      const user = await this.userService.updateUser(request.body);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async list(request: Request, response: Response) {
    const currentUser = response.locals.decoded.user;
    const valSchema = new User().getListVs();
    let params: RequestParams = request.query;
    const result = await appFunctions.validateSchema(valSchema, params);
    if (result.status) {
      const resp = await this.userService.list(params, currentUser);
      this.resp.resp(response).send(resp);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async getProfile(_request: Request, response: Response) {
    const currentUser = response.locals.decoded.user;
    const resp = await this.userService.getUserDetail(currentUser.id);
    this.resp.resp(response).send(resp);
  }

  public async getDetail(request: Request, response: Response) {
    const resp = await this.userService.getUserDetail(request.params.id);
    this.resp.resp(response).send(resp);
  }
}
