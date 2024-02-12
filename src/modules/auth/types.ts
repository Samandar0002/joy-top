export namespace IEntity {
  export type Role = 'ROLE_USER' | 'ROLE_ADMIN';

  export interface User {
    token: string;
    role: Role[];
    phone: string;
    name: string;
  }
  export interface IUser {
    id?: string;
    phone: string;
    status?: string;
    lastName?: string;
    name: string;
    createDate?: string;
    role: Role[];
  }
}

export namespace IForm {
  export interface Login {
    phone: string;
    password: string;
  }

  export interface Register {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }

  export interface Verification {
    phone: string;
    code: string;
  }

  export interface ResendVerification {
    phone: string;
  }
}

export namespace IApi {
  interface Standard<T = undefined> {
    code: number;
    isError: boolean;
    data: T;
  }

  export namespace Login {
    export interface Request extends IForm.Login {}
    export interface Response extends Standard<IEntity.User> {}
  }

  export namespace Register {
    export interface Request extends Omit<IForm.Register, 'confirmPassword'> {}
    export interface Response extends Standard<string> {}
  }

  export namespace ResendVerification {
    export interface Request extends IForm.ResendVerification {}
    export interface Response extends Standard {}
  }

  export namespace Verification {
    export interface Request extends IForm.Verification {}
    export interface Response extends Standard<IEntity.User> {}
  }

  export namespace Profile {
    export interface Response extends Standard<IEntity.IUser> {}
  }
}

export interface IContext {
  user: IEntity.User | IEntity.IUser | null;
  confirmNumber: string;
  methods: {
    logout(): void;
    login(user: IEntity.User | IEntity.IUser): void;
    phoneNumberConfirm(phone: string | null): void;
  };
}
