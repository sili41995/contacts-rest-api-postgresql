import { Request } from 'express';

export type MulterFile = Express.Multer.File;

export interface IUser {
  id: number;
  name: string;
  lastName?: string;
  password: string;
  email: string;
  phone?: string;
  location?: string;
  dateOfBirth?: Date;
  token: string | null | undefined;
  avatar: string;
}

export interface IRequest extends Request {
  user?: IUser;
  file?: MulterFile;
}

export interface IAuthRequest extends IRequest {
  body: IUser;
}

export interface IRegExp {
  phone: RegExp;
  email: RegExp;
  notEmptyValue: RegExp;
}

export interface IHttpError {
  status: number;
  message?: string;
}

export interface IUploadImageProps {
  path: string;
}

export interface IAuthRequest extends IRequest {
  body: IUser;
}

export interface DecodedToken {
  id: number;
}
