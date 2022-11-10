// Email ou Password são inválidos, não achou o USER

export default class MissingParamError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}
