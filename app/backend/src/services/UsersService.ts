import JWT from '../helpers/jwt';
import Users from '../database/models/UsersModel';
// import { compare } from 'bcryptjs';

export default class UsersService {
  public login = async (user: any) => {
    const { email } = user;
    const exists = await Users.findOne({ where: { email } }) as Users;

    const payload = { email: exists.email, role: exists.role };

    const token = JWT.createToken(payload);

    return token;
  };
}
