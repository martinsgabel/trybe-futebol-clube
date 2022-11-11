import JWT from '../helpers/jwt';
import Users from '../database/models/UsersModel';
import { LoginUser } from '../interfaces/services/Login';
import loginSchema from '../middlewares/loginValidation';
import MissingParamError from '../errors/MissingParamError';
import UnauthorizedError from '../errors/UnauthorizedError';
import { decodingPassword } from '../helpers/bcrypt';

export default class UsersService {
  public login = async (user: LoginUser) => {
    const { email, password } = user;

    // validando se os campos existem
    if (!email || !password) throw new MissingParamError('All fields must be filled');

    // validando se os campos estão preenchidos de forma correta
    const { error } = loginSchema.validate(user);

    if (error) throw new UnauthorizedError('Incorrect email or password');

    // checando se USER existe no banco
    const exists = await Users.findOne({ where: { email } }) as Users;

    const existingPassword = decodingPassword(password, exists.password);

    if (!exists || !existingPassword) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    // devolvendo token
    const payload = { email: exists.email, role: exists.role };

    const token = JWT.createToken(payload);

    return { token };
  };
}
