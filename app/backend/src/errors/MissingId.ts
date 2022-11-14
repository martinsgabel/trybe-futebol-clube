export default class MissingId extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}
