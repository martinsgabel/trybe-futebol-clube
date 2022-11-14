// Email ou Password são inválidos, não achou o USER

export default class MissingId extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}
