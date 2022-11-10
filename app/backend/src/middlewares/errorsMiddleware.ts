import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(500).json({ error: err.message });
};

export default errorMiddleware;
