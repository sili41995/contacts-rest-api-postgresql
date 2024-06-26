import { NextFunction, Response } from 'express';
import { IContactsRequest, IUser } from '../../types/types';
import { httpError, ctrlWrapper, filterFieldsToUpdate } from '../../utils';
import { prisma } from '../../app';

const updateById = async (req: IContactsRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id: owner } = req.user as IUser;
  const { contactId } = req.params;
  const data = filterFieldsToUpdate(req.body);
  const result = await prisma.contact.update({ where: { id: Number(contactId), owner }, data });

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json(result);
};

export default ctrlWrapper<IContactsRequest>(updateById);
