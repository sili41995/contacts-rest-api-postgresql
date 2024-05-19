import { NextFunction, Response } from 'express';
import { IContactsRequest, IUser, MulterFile } from '../../types/types';
import { httpError, updateImage, getImageFilename, ctrlWrapper } from '../../utils';
import prisma from '../../server';

const updateAvatarById = async (req: IContactsRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id: owner } = req.user as IUser;
  const { contactId } = req.params;
  const { path } = req.file as MulterFile;

  const contact = await prisma.contact.findFirst({ where: { id: Number(contactId), owner } });

  if (!contact) {
    throw httpError({ status: 404 });
  }

  const filename = getImageFilename(contact.avatar);
  const { url: avatarURL } = await updateImage({
    path,
    filename,
  });
  const result = await prisma.contact.update({ where: { id: Number(contactId), owner }, data: { avatar: avatarURL } });

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json(result);
};

export default ctrlWrapper<IContactsRequest>(updateAvatarById);
