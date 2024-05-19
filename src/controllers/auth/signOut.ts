import { NextFunction, Response } from 'express';
import { IAuthRequest, IUser } from '../../types/types';
import { ctrlWrapper } from '../../utils';
import { prisma } from '../../app';

const signOut = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.user as IUser;
  await prisma.user.update({ where: { id }, data: { token: null } });

  res.status(204).json();
};

export default ctrlWrapper<IAuthRequest>(signOut);
