import { Router } from 'express';
import InquireController from '../controller/inquire';
export default class InquireRoute {
  private router: Router;
  private inquireController = new InquireController();
  constructor(router: Router) {
    this.router = router;
    this.routes();
  }

  routes() {
    this.router.post('/services/contact-us', this.inquireController.create.bind(this.inquireController));
    this.router.get('/inquire', this.inquireController.list.bind(this.inquireController));
    this.router.put('/inquire', this.inquireController.update.bind(this.inquireController));
    this.router.delete('/inquire/:id', this.inquireController.delete.bind(this.inquireController));
  }
}
