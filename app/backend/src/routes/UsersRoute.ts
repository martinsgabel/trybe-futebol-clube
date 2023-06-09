import { Router } from 'express';
import UsersController from '../controller/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter
  .post('/login', usersController.login)
  .get('/login/validate', usersController.validate);

export default usersRouter;
