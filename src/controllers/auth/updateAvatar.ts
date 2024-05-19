import { NextFunction, Response } from 'express';
import { IAuthRequest, IUser, MulterFile } from '../../types/types';
import { ctrlWrapper, updateImage, getImageFilename, httpError } from '../../utils';
import { prisma } from '../../app';

const updateAvatar = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const { avatar, id } = req.user as IUser;
  const { path } = req.file as MulterFile;
  const filename = getImageFilename(avatar);
  const { url: avatarURL } = await updateImage({
    path,
    filename,
  });
  const result = await prisma.user.update({ where: { id }, data: { avatar: avatarURL } });

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json({ avatar: result.avatar });
};

export default ctrlWrapper<IAuthRequest>(updateAvatar);
