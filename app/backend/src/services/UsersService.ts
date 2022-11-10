import JWT from '../helpers/jwt';
import Users from '../database/models/UsersModel';
import { LoginUser } from '../interfaces/services/Login';
import loginSchema from '../middlewares/loginValidation';
import MissingParamError from '../errors/MissingParamError';
import UnauthorizedError from '../errors/UnauthorizedError';

export default class UsersService {
  public login = async (user: LoginUser) => {
    const { email, password } = user;

    // validando campos
    if (!email || !password) throw new MissingParamError('All fields must be filled');

    const { error } = loginSchema.validate(user);

    // lançando erro, caso haja
    if (error) throw new UnauthorizedError('Incorrect email or password');

    // checagem no banco
    const exists = await Users.findOne({ where: { email } }) as Users;

    if (!exists) throw new UnauthorizedError('Incorrect email or password');

    // devolvendo token
    const payload = { email: exists.email, role: exists.role };

    const token = JWT.createToken(payload);

    return token;
  };
}
