import { Response } from 'express';
import { ServiceReturnVal } from './custom_types';
import constants from './constants';
import fs from 'fs';
import path from 'path';

export class RespError extends Error {
  public code: number = 0;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }

  public static unauthenticate(
    message: string = 'Unauthenticated',
    code: number = constants.RESP_ERR_CODES.ERR_401
  ): Error {
    return new RespError(code, message);
  }

  public static validation(message: string, code: number = constants.RESP_ERR_CODES.ERR_400): Error {
    return new RespError(code, message);
  }

  public static unauthoriedAction(message: string = constants.ERROR_MESSAGES.NOT_AUTHORISED): Error {
    return new RespError(constants.RESP_ERR_CODES.ERR_422, message);
  }
}

export class ArrowResponse {
  private response?: Response;

  public resp(response: Response) {
    this.response = response;
    return this;
  }

  public send(data: ServiceReturnVal<any>) {
    if (data.error) {
      this.response!.status((data.error as RespError).code).json({ error: data.error.message });
    } else {
      this.response!.json(data);
    }
  }

  public sendFile(data: ServiceReturnVal<any>) {
    if (data.error) {
      this.response!.status((data.error as RespError).code).json({ error: data.error.message });
    } else {
      try {
        var file = fs.createReadStream(data.filePath!);
        this.response!.writeHead(200, {
          'Content-disposition': `attachment; filename=${path.basename(data.filePath!)}"}`,
        });
        file.pipe(this.response!);
        file.on('close', function () {
          fs.unlinkSync(data.filePath!);
        });

        file.on('error', (error) => {
          this.error(error);
          fs.unlinkSync(data.filePath!);
        });
      } catch (error) {
        this.error(error);
      }
    }
  }

  public error(error: Error) {
    this.response!.status((error as RespError).code).json({ error: error.message });
  }
}
