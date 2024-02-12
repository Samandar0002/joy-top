import { http } from 'services';

import { IApi } from './types';

export const DachaList = (size: number, payload: IApi.Dacha.Request) =>
  http.post<IApi.Dacha.Response>(`/dacha/public/filter?size=${size}`, payload);
export const HouseList = (size: number, payload: IApi.House.Request) =>
  http.post<IApi.House.Response>(`/apartment/public/filter?size=${size}`, payload);
export const HotelList = (size: number, payload: IApi.Hotel.Request) =>
  http.post<IApi.Hotel.Response>(`/hotel/public/filter?size=${size}`, payload);
export const ResortList = (size: number, payload: IApi.Resort.Request) =>
  http.post<IApi.Resort.Response>(`/camp/public/filter?size=${size}`, payload);
export const TourList = (size: number, payload: IApi.Tour.Request) =>
  http.post<IApi.Tour.Response>(`/travel/public/filter?size=${size}`, payload);
export const ExtremeList = (size: number, payload: IApi.Extreme.Request) =>
  http.post<IApi.Extreme.Response>(`/extreme/public/filter?size=${size}`, payload);
export const CountryList = () => http.get('/country/public/user');
