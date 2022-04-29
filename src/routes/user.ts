import { Router } from 'express';
import UserController from '../controller/user';
export default class UserRoute {
  private router: Router;
  private userController = new UserController();
  constructor(router: Router) {
    this.router = router;
    this.routes();
  }

  routes() {
    this.router.post('/services/sign-up', this.userController.create.bind(this.userController));
    this.router.put('/user', this.userController.update.bind(this.userController));
    this.router.get('/user', this.userController.list.bind(this.userController));
    this.router.get('/user/profile', this.userController.getProfile.bind(this.userController));
    this.router.get('/user/detail/:id', this.userController.list.bind(this.userController));
  }
}
