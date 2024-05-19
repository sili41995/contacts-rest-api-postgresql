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

export interface INewContact {
  [key: string]: string | boolean | number | undefined | null;
  id: number;
  name: string;
  phone: string;
  email?: string;
  role?: string;
  description?: string;
  tgUsername?: string;
  favorite?: boolean;
  avatar: string;
}

export interface IContact extends INewContact {
  owner: number | undefined;
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

export interface IContactsRequest extends IRequest {
  body: INewContact;
}

export interface DecodedToken {
  id: number;
}

export interface IUpdateImageProps {
  path: string;
  filename: string;
}

export interface IFindFilterProps {
  owner: number;
  query: {
    page?: string;
    limit?: string;
    favorite?: string;
  };
}

export interface IFilter {
  owner: number;
  favorite?: boolean;
}

export interface IFindFilterValues {
  skip: number;
  take: number;
  findFilter: IFilter;
}
