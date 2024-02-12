import { http } from 'services';

import { IApi } from './types';

export const Message = ({ fromDay, toDay, fromPrice, toPrice, price, text, phone }: IApi.SendMessage.Request) =>
  http.post('/message/public', { fromDay, toDay, fromPrice:'', toPrice:'', price, text, phone });
