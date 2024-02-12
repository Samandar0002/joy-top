export namespace IEntity {
  export interface DachaRes {
    extremeType: any;
    countryArea: number;
    countryPrice: number;
    id: string;
    country: {
      id: number;
      name: string;
    };
    region: {
      id: number;
      name: string;
    };
    district: {
      id: number;
      name: string;
    };
    latitude: number;
    longitude: number;
    mainAttach: {
      id: string;
      size: number;
      url: string;
    };
    placeType: string;
    createdDate: string;
    number: number;
    weekDayPrice: number;
    weekendPrice: number;
    totalArea: number;
    singleBedRoomCount: number;
    doubleBedRoomCount: number;
    name: string;
    subType: string;
    tariff_result: string;
  }

  export interface HouseRes {
    id: string;
    country: {
      id: number;
      name: string;
    };
    region: {
      id: number;
      name: string;
    };
    district: {
      id: number;
      name: string;
    };
    latitude: number;
    longitude: number;
    mainAttach: {
      id: string;
      size: number;
      url: string;
    };
    placeType: string;
    createdDate: string;
    dayPrice: number;
    monthPrice: number;
    totalArea: number;
    singleBedRoomCount: number;
    doubleBedRoomCount: number;
    roomCount: number;
    subType: string;
  }
  export interface HotelRes {
    id: string;
    country: {
      id: number;
      name: string;
    };
    region: {
      id: number;
      name: string;
    };
    district: {
      id: number;
      name: string;
    };
    latitude: number;
    longitude: number;
    mainAttach: {
      id: string;
      size: number;
      url: string;
    };
    placeType: string;
    createdDate: string;
    name: string;
    starCount: number;
    minPrice: number;
  }
  export interface ResortsRes {
    id: string;
    country: {
      id: number;
      name: string;
    };
    region: {
      id: number;
      name: string;
    };
    district: {
      id: number;
      name: string;
    };
    latitude: number;
    longitude: number;
    mainAttach: {
      id: string;
      size: number;
      url: string;
    };
    placeType: string;
    createdDate: string;
    name: string;
    price: number;
  }
  export interface TourRes {
    id: string;
    country: {
      id: number;
      name: string;
    };
    region: {
      id: number;
      name: string;
    };
    district: {
      id: number;
      name: string;
    };
    latitude: number;
    longitude: number;
    mainAttach: {
      id: string;
      size: number;
      url: string;
    };
    placeType: string;
    createdDate: string;
    companyName: string;
    companyAddress: string;
    standardsPrice: number;
  }
  export interface ExtremeRes {
    id: string;
    country: {
      id: number;
      name: string;
    };
    region: {
      id: number;
      name: string;
    };
    district: {
      id: number;
      name: string;
    };
    latitude: number;
    longitude: number;
    mainAttach: {
      id: string;
      size: number;
      url: string;
    };
    placeType: string;
    createdDate: string;
    weekDayPrice: number;
    extremeType: {
      id: string;
      name: string;
    };
  }
  export interface CountryRes {
    id: number;
    name: string;
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
  interface Standard2<T = undefined> {
    code: number;
    isError: boolean;
    data: [T];
  }

  export namespace Dacha {
    export interface Request {
      countryId?: string | null;
      districtId?: string | null;
      radius?: number | null;
      number?: string | null;
      regionId?: string | null;
      subType?: string | null;
      type?: string | null;
      bedRoomCount?: number | null;
      priceFrom?: string | null;
      priceTo?: string | null;
      roomCount?: number | null;
      convenienceList?: number[] | null;
      latitude?: number | null;
      longitude?: number | null;
    }
    export interface Response extends Standard<IEntity.DachaRes> {}
  }
  export namespace House {
    export interface Request extends Dacha.Request {
      totalArea?: string | null;
    }
    export interface Response extends Standard<IEntity.HouseRes> {}
  }
  export namespace Hotel {
    export interface Request extends Dacha.Request {
      name?: string | null;
      starCount?: number | null;
    }
    export interface Response extends Standard<IEntity.HotelRes> {}
  }
  export namespace Resort {
    export interface Request extends Dacha.Request {
      name?: string | null;
    }
    export interface Response extends Standard<IEntity.ResortsRes> {}
  }
  export namespace Tour {
    export interface Request extends Dacha.Request {
      companyName?: string | null;
    }
    export interface Response extends Standard<IEntity.TourRes> {}
  }
  export namespace Extreme {
    export interface Request extends Dacha.Request {
      extremeTypeId?: string | null;
    }
    export interface Response extends Standard<IEntity.ExtremeRes> {}
  }
  export namespace Country {
    export interface Request {}
    export interface Response extends Standard2<IEntity.CountryRes> {}
  }
}
