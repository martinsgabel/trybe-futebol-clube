import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;

// interface IPayload {
//   data: object | string | number | Buffer;
// }

export default class JWT {
  static createToken = (payload: unknown) => {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '10d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: payload }, secret as string, jwtConfig);

    return token;
  };

  // static decodePassword = async (token: string) => {
  //   const { data } = jwt.verify(token, secret as string) as unknown as IPayload;
  //   return data;
  // };
}
