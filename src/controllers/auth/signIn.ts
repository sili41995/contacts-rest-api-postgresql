import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { DecodedToken, IAuthRequest } from '../../types/types';
import { ctrlWrapper, httpError } from '../../utils';
import { prisma } from '../../app';

const { SECRET_KEY } = process.env;

const signIn = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  console.log(SECRET_KEY);
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({ where: { email } });
  const isValidPassword = await bcrypt.compare(password, user?.password ?? '');

  if (!user || !isValidPassword) {
    throw httpError({ status: 401, message: 'Email or password is wrong' });
  }

  const payload: DecodedToken = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY as string, { expiresIn: '10d' });
  const result = await prisma.user.update({ where: { id: user.id }, data: { token } });

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json({
    token: result.token,
    user: {
      name: result.name,
      email: result.email,
      avatar: result.avatar,
    },
  });
};

export default ctrlWrapper<IAuthRequest>(signIn);
