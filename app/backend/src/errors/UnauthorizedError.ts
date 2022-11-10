// caso não ache o User

export default class UnauthorizedError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}
