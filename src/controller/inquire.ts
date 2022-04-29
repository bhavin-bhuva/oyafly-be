import { Request, Response } from 'express';
import { ArrowResponse, RespError } from '../common/arrow_response';

import InquireService from '../services/inquire';
import Inquire from '../validations/common/inquire';
import appFunctions from '../common/app_functions';

export default class InquireController {
  private inquireService = new InquireService();
  private resp = new ArrowResponse();

  public async create(request: Request, response: Response) {
    const valSchema = new Inquire().getVS(false);
    const result = await appFunctions.validateSchema(valSchema, request.body);
    if (result.status) {
      const user = await this.inquireService.create(request.body);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async update(request: Request, response: Response) {
    const valSchema = new Inquire().getVS(true);
    const result = await appFunctions.validateSchema(valSchema, request.body);
    if (result.status) {
      const currentUser = response.locals.decoded.user;
      const user = await this.inquireService.update(request.body, currentUser);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async list(request: Request, response: Response) {
    const valSchema = new Inquire().getListVs();
    const result = await appFunctions.validateSchema(valSchema, request.query);
    if (result.status) {
      const currentUser = response.locals.decoded.user;
      const user = await this.inquireService.list(request.query, currentUser);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }

  public async delete(request: Request, response: Response) {
    const currentUser = response.locals.decoded.user;
    const user = await this.inquireService.delete(request.params, currentUser);
    this.resp.resp(response).send(user);
  }
}
