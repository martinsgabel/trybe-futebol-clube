import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;

interface IPayload {
  data: {
    email: string;
    role: string;
  }
}

export default class JWT {
  static createToken = (payload: unknown) => {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '10d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: payload }, secret as string, jwtConfig);

    return token;
  };

  static decodeToken = async (token: string) => {
    const { data } = await jwt.verify(token, secret as string) as unknown as IPayload;
    return data;
  };
}
