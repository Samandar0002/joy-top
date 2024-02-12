export namespace IEntity {
  export interface Message {
    fromDay: string;
    fromPrice: string;
    toDay: string;
    toPrice: string;
    price: number;
    text: string;
    phone: string;
  }
}
export namespace IApi {
  interface Standard<T = undefined> {
    code: number;
    isError: boolean;
    data: T;
  }
  export namespace SendMessage {
    export interface Request extends IEntity.Message {}
    export interface Response extends Standard {}
  }
}
