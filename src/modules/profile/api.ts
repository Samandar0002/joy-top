import { http } from 'services';

import { IApi } from './types';

export const UserList = (page: number) => http.post<IApi.User.Response>(`/profile/admin/filter?page=${page}&size=20`, {});
