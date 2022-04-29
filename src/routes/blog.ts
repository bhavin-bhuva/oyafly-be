import { Router } from 'express';
import BlogController from '../controller/blog';
export default class BlogRoute {
  private router: Router;
  private blogController = new BlogController();
  constructor(router: Router) {
    this.router = router;
    this.routes();
  }

  routes() {
    this.router.post('/blog', this.blogController.create.bind(this.blogController));
    this.router.get('/services/blog', this.blogController.list.bind(this.blogController));
    this.router.put('/blog', this.blogController.update.bind(this.blogController));
    this.router.delete('/blog/:id', this.blogController.delete.bind(this.blogController));
  }
}
