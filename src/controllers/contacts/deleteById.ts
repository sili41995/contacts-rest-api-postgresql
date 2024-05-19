import { NextFunction, Response } from 'express';
import { IContactsRequest, IUser } from '../../types/types';
import { httpError, ctrlWrapper, deleteImage } from '../../utils';
import { prisma } from '../../app';

const deleteById = async (req: IContactsRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id: owner } = req.user as IUser;
  const { contactId } = req.params;
  const result = await prisma.contact.delete({
    where: { id: Number(contactId), owner },
  });

  if (!result) {
    throw httpError({ status: 404 });
  }

  await deleteImage(result.avatar);

  res.status(200).json(result);
};

export default ctrlWrapper<IContactsRequest>(deleteById);
