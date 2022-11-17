import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../errors/UnauthorizedError';
import JWT from '../helpers/jwt';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) throw new UnauthorizedError('Token not found');

  try {
    const authorized = await JWT.decodeToken(authorization);

    if (!authorized) throw new UnauthorizedError('Token not found');

    next();
  } catch (error: any) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidation;
