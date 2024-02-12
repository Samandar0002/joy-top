import get from 'lodash/get';

import { IEntity } from './types';

export const User = (item?: any): IEntity.User => ({
  token: get(item, 'token') || '',
  name: get(item, 'name') || '',
  phone: get(item, 'phone') || '',
  role: get(item, 'role') || []
});

export const IUser = (item?: any): IEntity.IUser => ({
  name: get(item, 'firstName') || '',
  phone: get(item, 'phone') || '',
  role: get(item, 'roleList') || []
});
