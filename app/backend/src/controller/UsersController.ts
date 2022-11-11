import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

export default class UsersController {
  constructor(private usersService = new UsersService()) { }

  public login = async (req: Request, res: Response) => {
    const result = await this.usersService.login(req.body);

    return res.status(201).json(result);
  };
}
