import axios from 'axios';

import { config } from 'config';

import { session } from './session';

export const http = axios.create({ baseURL: config.baseURL });

http.interceptors.request.use(request => {
  const token = session.get();

  if (token) {
    request.headers = { ...request.headers, [config.backendTokenKEY]: `Bearer ${token}` } as any;
  }

  return request;
});
