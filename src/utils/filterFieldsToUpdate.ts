import { INewContact } from '../types/types';

const filterFieldsToUpdate = (data: INewContact): INewContact => {
  const updatedContact: INewContact = { ...data };

  const keys: (keyof INewContact)[] = Object.keys(data) as (keyof INewContact)[];
  keys.forEach((key) => {
    data[key] === '' ? (updatedContact[key] = null) : (updatedContact[key] = data[key]);
  });

  return updatedContact;
};

export default filterFieldsToUpdate;
