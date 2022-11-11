import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

const codingPassword = (password: string) => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

const decodingPassword = (password: string, hash: string) => {
  const decoded = compareSync(password, hash);
  return decoded;
};

export { codingPassword, decodingPassword };
