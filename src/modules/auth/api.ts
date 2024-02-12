import { http } from 'services';

import { IApi } from './types';

export const Login = ({ password, phone }: IApi.Login.Request) =>
  http.post<IApi.Login.Response>('/auth/authenticate', {
    password,
    phone: `998${phone}`
  });

export const Register = ({ firstName: firstname, lastName: lastname, password, phone }: IApi.Register.Request) =>
  http.post('/auth/register', { password, firstname, lastname, phone: `998${phone}` });

export const ResendVerification = (data: IApi.ResendVerification.Request) =>
  http.post<IApi.ResendVerification.Response>('auth/register/resend', { phone: data.phone });

export const Verification = (data: IApi.Verification.Request) =>
  http.post<IApi.Verification.Response>('auth/verification-sms', { phone: data.phone, code: data.code });

export const Profile = () => http.get(`/profile/current`);
