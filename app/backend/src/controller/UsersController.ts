import { NextFunction, Request, Response } from 'express';
import UsersService from '../services/UsersService';

export default class UsersController {
  constructor(private usersService = new UsersService()) { }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.usersService.login(req.body);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public validate = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    try {
      const role = await this.usersService.validate(authorization as string);

      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
}
