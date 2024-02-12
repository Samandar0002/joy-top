import { http } from 'services';

// import { IApi } from './types';

export const addDacha = (payload: any) => http.post(`/dacha`, payload);
export const uploadImg = (payload: any) => http.post(`/attach/upload`, payload);
