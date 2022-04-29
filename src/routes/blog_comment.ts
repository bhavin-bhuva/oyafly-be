import { Router } from 'express';
import BlogCommentController from '../controller/blog_comment';
export default class BlogRoute {
  private router: Router;
  private blogCommentController = new BlogCommentController();
  constructor(router: Router) {
    this.router = router;
    this.routes();
  }

  routes() {
    this.router.post('/blog-cmnt', this.blogCommentController.create.bind(this.blogCommentController));
    this.router.get('/services/blog-cmnt', this.blogCommentController.list.bind(this.blogCommentController));
    this.router.put('/blog-cmnt', this.blogCommentController.update.bind(this.blogCommentController));
    this.router.delete('/blog-cmnt/:id', this.blogCommentController.delete.bind(this.blogCommentController));
  }
}
