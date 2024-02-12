import React, { ReactNode, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { session } from 'services';
import { sessionPhone } from 'services/session';

import { Loader } from 'components';

import Context from './context';
import { Api, Mappers, Types } from '.';

interface ContainerState extends Pick<Types.IContext, 'user'> {
  isLoading: boolean;
  confirmNumber: string;
}

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const [state, setState] = useState<ContainerState>({
    user: null,
    isLoading: !!session.get(),
    confirmNumber: ''
  });

  const logout = () => {
    setState(prevState => ({ ...prevState, user: null }));
    session.delete();
  };

  const login = (user: Types.IEntity.User) => {
    setState(prevState => ({ ...prevState, user }));
  };

  const phoneNumberConfirm = (phone: string) => {
    setState(prevState => ({ ...prevState, confirmNumber: phone }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setState(prevState => ({ ...prevState, isLoading: true }));
      try {
        const token = session.get();

        if (!token) {
          setState(prevState => ({ ...prevState, isLoading: false }));
          return;
        }
        const { data } = await Api.Profile();
        const user = Mappers.IUser(data.data);

        sessionPhone.set(user.phone)

        setState(prevState => ({ ...prevState, user, isLoading: false }));
      } catch (err: any) {
        if (err instanceof AxiosError) {
          session.delete();
          setState(prevState => ({ ...prevState, isLoading: false }));
        }
      }
    };

    fetchData();
  }, []);

  if (state.isLoading) return <Loader />;

  return (
    <Context.Provider
      value={{
        user: state.user,
        confirmNumber: state.confirmNumber,
        methods: {
          login,
          logout,
          phoneNumberConfirm
        }
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Container;
