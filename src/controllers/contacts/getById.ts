import { NextFunction, Response } from 'express';
import { IContactsRequest, IUser } from '../../types/types';
import { httpError, ctrlWrapper } from '../../utils';
import { prisma } from '../../app';

const getById = async (req: IContactsRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id: owner } = req.user as IUser;
  const { contactId } = req.params;
  const result = await prisma.contact.findFirst({ where: { id: Number(contactId), owner } });

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json(result);
};

export default ctrlWrapper<IContactsRequest>(getById);
