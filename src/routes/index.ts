import { Router } from 'express';
import AuthRoute from './auth';
import UserRoute from './user';
import InquireRoute from './inquire';
import BlogRoute from './blog';
import BlogCommentRoute from './blog_comment';
const router = Router();

new AuthRoute(router);
new UserRoute(router);
new InquireRoute(router);
new BlogRoute(router);
new BlogCommentRoute(router);
export default router;
