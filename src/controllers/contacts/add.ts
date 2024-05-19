import { NextFunction, Response } from 'express';
import { IContact, IContactsRequest, IUser } from '../../types/types';
import { ctrlWrapper, uploadImage } from '../../utils';
import { prisma } from '../../app';

const add = async (req: IContactsRequest, res: Response, next: NextFunction): Promise<void> => {
  if (req.file) {
    const { url: avatar } = await uploadImage(req.file);
    req.body.avatar = avatar;
  }

  const { id: owner } = req.user as IUser;

  const result = (await prisma.contact.create({ data: { ...req.body, owner } })) as IContact;
  result.owner = undefined;

  res.status(201).json(result);
};

export default ctrlWrapper<IContactsRequest>(add);
