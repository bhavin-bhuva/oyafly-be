import { Router } from 'express';
import AuthController from '../controller/auth';
export default class AuthRoute {
  private router: Router;
  private authController = new AuthController();
  constructor(router: Router) {
    this.router = router;
    this.routes();
  }

  routes() {
    this.router.post('/services/login', this.authController.login.bind(this.authController));
    // this.router.post('/services/password/set/:resetHash', this.authController.setPassword.bind(this.authController));
  }
}
