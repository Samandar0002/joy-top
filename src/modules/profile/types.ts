import { ReactNode } from 'react';

export namespace IEntity {
  export type Role = 'ROLE_USER' | 'ROLE_ADMIN';
  export interface UserRes {
    nameEn: ReactNode;
    nameUz: ReactNode;
    map(arg0: (item: UserRes, idx: number) => import('react/jsx-runtime').JSX.Element): import('react').ReactNode;
    roleList: Role[];
    status: string;
    phone: string;
    lastName: string;
    firstName: string;
    id: string | null | undefined;
  }
  export interface RegionRes {
    regionNameUz: ReactNode;
    map(arg0: (item: RegionRes, idx: number) => import('react/jsx-runtime').JSX.Element): import('react').ReactNode;
    nameUz: string;
    nameRu: string;
    nameEn: string;
    id: number;
  }
  export interface ExtremeRes {
    nameUz: string;
    nameRu: string;
    nameEn: string;
    id: number;
  }
  export interface CountriesRes {
    nameUz: string;
    nameRu: string;
    nameEn: string;
    id: number;
  }
  export interface ConvenienceRes {
    nameUz: string;
    nameRu: string;
    nameEn: string;
    id: number;
  }
  export interface SubscriptionRes {
    nameUz: string;
    nameRu: string;
    nameEn: string;
    orderNumber: number;
    price: number;
    days: number;
    id: number;
  }
  export interface SubscriptionListRes {
    price: string;
    id: string;
    placeId: string;
    placeType: string;
    tariffId: string;
    days: number;
    startDate: string;
    endDate: string;
    status: string;
    prtId: string;
  }
  export interface TransactionsListRes {
    startDate: any;
    id: string;
    placeId: string;
    placeType: string;
    tariffId: string;
    price: number;
    days: number;
    status: string;
  }
}

export namespace IApi {
  interface Standard<T = undefined> {
    code: number;
    isError: boolean;
    data: {
      totalElements(totalElements: any): unknown;
      content: [T];
    };
  }

  export namespace User {
    export interface Request {}
    export interface Response extends Standard<IEntity.UserRes> {}
  }
}
