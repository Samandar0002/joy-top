export namespace IApi {
  interface Standard<T = undefined> {
    code: number;
    isError: boolean;
    data: [T];
  }
  export interface File {}

  export interface imgResponse {
    id: string;
    orginalName: string;
    size: number;
    url: string;
  }
  export interface addAttach {
    id: string;
  }
  export interface addReq {
    name?: string;
    attachList?: addAttach[];
    countryId: number;
    regionId: number;
    districtId: number;
    territoryId?: number;
    contact: string;
    description?: string;
    latitude?: number;
    longitude?: number;
    type: string;
    videoUrl?: string;
    subType: string;
  }

  export namespace uploadImg {
    export interface Request {
      additionalProp1: File;
      additionalProp2: File;
      additionalProp3: File;
    }
    export interface Response extends Standard<imgResponse[]> {}
  }
  export namespace addDacha {
    export interface Request extends  addReq{
      alcohol?: boolean;
      availableOnlyFamily?: boolean;
      calendarList?: [];
      convenienceList?: [];
      departureTime: string;
      doubleBedRoomCount: string;
      enterTime: string;
      gageOfDeposit?: number;
      latitude?: number;
      longitude?: number;
      loudlyMusic?: boolean;
      name?: string;
      number: string;
      party?: boolean;
      priceOnSale: string;
      roomCount: string;
      singleBedRoomCount: string;
      smoking?: boolean;
      tariff_result?: string;
      totalArea?: string;
      weekDayPrice: string;
      weekendPrice: string;
    }
    export interface Response extends Standard {}
  }
}
