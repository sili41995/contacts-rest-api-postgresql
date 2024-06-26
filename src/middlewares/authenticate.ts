import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { DecodedToken, IAuthRequest, IRequest, IUser } from '../types/types';
import { ctrlWrapper, httpError } from '../utils';
import { prisma } from '../app';

const { SECRET_KEY } = process.env;

const authenticate = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw httpError({ status: 401 });
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY as Secret) as DecodedToken;
    const user = (await prisma.user.findFirst({ where: { id }, select: { id: true, token: true, avatar: true, email: true, name: true } })) as IUser | null;

    if (!user || user.token !== token) {
      throw httpError({ status: 401 });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      throw httpError({ status: 401, message: error.message });
    }
  }
};

export default ctrlWrapper<IRequest>(authenticate);
