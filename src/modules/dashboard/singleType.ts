interface ICommonResponseData {
  id: string;
  attachList: Array<{ id: string; size: number; url: string }>;
  videoUrl: string;
  region: { id: number; nameUz: string };
  country: { id: number; name: string };
  district: { id: number; nameUz: string };
  imageUrl?: string;
  latitude: number;
  longitude: number;
  type: string;
  smoking: boolean;
  alcohol: boolean;
  pets: boolean;
  availableOnlyFamily: boolean;
  loudlyMusic: boolean;
  party: boolean;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  description: string;
  contact: string;
  status: string;
  createdDate: string;
  name: string;
  subType: string;
  totalArea: number;
  roomCount: number;
  singleBedRoomCount: number;
  doubleBedRoomCount: number;
  weekDayPrice: number;
  weekendPrice: number;
  gageOfDeposit: number;
  enterTime: string;
  departureTime: string;
  maximumDayBooking: number;
  minimumDayBooking: number;
  address: string;
  convenienceList: Array<{ id: number; name: string }>;
  number: number;
  tariff_result: string;
}

export namespace IEntity {
  export interface Request {
    id: string;
  }

  export interface SingleDachaResponse extends ICommonResponseData {
    data: any;
    img: string;
    url: string;
  }

  export interface SingleHotelResponse extends ICommonResponseData {
    data: SingleHotelResponse;
   
  }

  export interface SingleResortResponse extends ICommonResponseData {
    data: SingleResortResponse;
   
  }

  export interface SingleExtremeResponse extends ICommonResponseData {
    data: SingleExtremeResponse;
    extremeType: { id: string; name: string }; 
  }

  export interface SingleTravelResponse extends ICommonResponseData {
    extremeType: any;
    data: SingleTravelResponse; 
  }

  export interface SingleHouseResponse extends ICommonResponseData {
    data: any;
   
  }
}
