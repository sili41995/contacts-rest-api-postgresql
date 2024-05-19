import { NextFunction, Request, Response } from 'express';
import { httpError } from '../utils';

const isValidId = (req: Request, res: Response, next: NextFunction): void => {
  const { contactId } = req.params;
  const isInvalidId = Number.isNaN(Number(contactId));
  if (isInvalidId) {
    return next(httpError({ status: 404, message: `${contactId} is not valid id` }));
  }

  next();
};

export default isValidId;
