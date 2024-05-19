import { NextFunction, Response } from 'express';
import { IContactsRequest, IUser } from '../../types/types';
import { ctrlWrapper, getFindFilter } from '../../utils';
import { prisma } from '../../app';

const getAll = async (req: IContactsRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id: owner } = req.user as IUser;
  const { skip, take, findFilter } = getFindFilter({
    owner,
    query: req.query,
  });

  const result = await prisma.contact.findMany({ where: findFilter, skip, take });
  const count = await prisma.contact.count({ where: findFilter });

  res.status(200).json({
    contacts: result,
    count,
  });
};

export default ctrlWrapper<IContactsRequest>(getAll);
