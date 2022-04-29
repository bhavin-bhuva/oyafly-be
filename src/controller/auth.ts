import { Request, Response } from 'express';
import { ArrowResponse, RespError } from '../common/arrow_response';

import UserService from '../services/user';
import Auth from '../validations/common/auth';
import appFunctions from '../common/app_functions';

export default class AuthController {
  private userService = new UserService();
  private resp = new ArrowResponse();

  public async login(request: Request, response: Response) {
    const valSchema = new Auth().getLoginVS();
    const result = await appFunctions.validateSchema(valSchema, request.body);
    if (result.status) {
      const user = await this.userService.login(request.body);
      this.resp.resp(response).send(user);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error!));
    }
  }
}
