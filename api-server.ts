import express, { ErrorRequestHandler } from 'express';
import compression from 'compression';
import cors from 'cors';
import jwt from 'express-jwt';
import router from './src/routes';
import { ArrowResponse, RespError } from './src/common/arrow_response';
import utility from './src/common/utility';
import constants from './src/common/constants';

export class ApiServer {
  public app: express.Application;
  private resp = new ArrowResponse();

  constructor() {
    this.app = express();
    this.configureJWT();
    this.config();
    this.routes();
  }

  public config() {
    this.app.use(express.json());
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(express.json({ limit: '30mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '30mb' }));
  }

  public configureJWT() {
    const publicRoutes = [
      /\/services\/*/,
      /\/marketplace\/*/,
      /\/client-services\/webhooks\/*/,
      /\/client-services\/*/,
      '/_ah/start',
    ];
    this.app.use(
      jwt({
        secret: process.env.JWT!,
        algorithms: ['HS256'],
        resultProperty: 'locals.decoded.user',
      }).unless({ path: publicRoutes })
    );
  }

  public routes() {
    this.app.use('/', router);
    const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
      response.header('Access-Control-Allow-Origin', '*');
      const statusCode = utility.isEmpty(error.status) ? constants.RESP_ERR_CODES.ERR_500 : error.status;
      this.resp.resp(response).error(new RespError(statusCode, error.message));
    };
    this.app.use(errorHandler);
  }

  public start() {
    this.app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`API server started at http://localhost:${process.env.PORT}`);
    });
  }
}
