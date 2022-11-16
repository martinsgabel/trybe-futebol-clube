import * as bcrypt from 'bcryptjs';
import JWT from '../helpers/jwt';
import Users from '../database/models/UsersModel';
import { LoginUser } from '../interfaces/services/Login';
import loginSchema from '../middlewares/loginValidation';
import MissingParamError from '../errors/MissingParamError';
import UnauthorizedError from '../errors/UnauthorizedError';

export default class UsersService {
  public login = async (user: LoginUser) => {
    const { email, password } = user;
    const unauthorizedError = 'Incorrect email or password';

    // validando se os campos existem
    if (!email || !password) throw new MissingParamError('All fields must be filled');

    // validando se os campos estão preenchidos de forma correta
    const { error } = loginSchema.validate(user);

    if (error) throw new UnauthorizedError(unauthorizedError);

    // checando se USER existe no banco
    const exists = await Users.findOne({ where: { email } }) as Users;

    if (!exists) {
      throw new UnauthorizedError(unauthorizedError);
    }

    const existingPassword = bcrypt.compareSync(password, exists.password);

    if (!existingPassword) {
      throw new UnauthorizedError(unauthorizedError);
    }

    // devolvendo token
    const payload = { email: exists.email, role: exists.role };

    const token = JWT.createToken(payload);

    return { token };
  };

  public validate = async (token: string) => {
    const password = token;

    // checar token na lista de usuários
    const user = await Users.findOne({ where: { password } });

    if (!user) throw new UnauthorizedError('Incorrect email or password');

    const { role } = user;

    // retornar role do usuário
    return role;
  };
}
