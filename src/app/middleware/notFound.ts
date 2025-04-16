import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

const notFound: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    succes: false,
    message: 'Route not found',
    error: '',
  });
};

export default notFound;
