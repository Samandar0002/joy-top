import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, message, Tag } from 'antd';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { session } from 'services';
import { sessionPhone } from 'services/session';

import { Api, Context, Mappers } from 'modules/auth';
import { IForm } from 'modules/auth/types';

import { Modal } from 'components';

import Reset from './resend';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const context = React.useContext(Context);
  const { t } = useTranslation();
  // eslint-disable-next-line consistent-return
  const onFinish = async (values: IForm.Login) => {
    try {
      const { data } = await Api.Login(values);

      const user = Mappers.User(data.data);

      message.success(`Successfully logged in. Hi ${user.name}`);
      context.methods.login(user);
      session.set(user.token);
      sessionPhone.set(values.phone);
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) message.error(error.response?.data);
    }
  };
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className=" mt-5 flex h-[500px] w-[100vw] flex-col items-center justify-center">
        <Form title="Login Form" name="phone" onFinish={onFinish} className="w-[300px]">
          <span>{t('Enter your phone number')}</span>
          <Form.Item<IForm.Login>
            name="phone"
            rules={[
              { required: true, message: t('Please enter your phone!') },

              { pattern: /^\d{9}$/, message: t( 'Phone must be at least 9 digits') }
            ]}
          >
            <Input prefix={<Tag className="py-2">+998</Tag>} size="large" placeholder="Phone" />
          </Form.Item>

          <span>{t('Password')}</span>
          <Form.Item<IForm.Login>
            name="password"
            rules={[
              { required: true, message: t('Please enter your password!') },
              { min: 6, message: t('Password must be at least 6 characters') }
            ]}
          >
            <Input.Password size="large" placeholder="Password" className="py-3" />
          </Form.Item>

          <button type="submit" className="buttons h-10 w-full">
           {t('Login')}
          </button>
        </Form>
        <span onClick={handleOpenModal} className="pt-3 text-[#FF7E47]">
          {t('Forgot your password?')}
        </span>
        <span>
          <Link className="text-[#FF7E47]" to="/auth/register">
           {t('Sign up')}
          </Link>{' '}
          {t('if you do not have account yet.')}
        </span>
      </div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <Reset />
      </Modal>
    </>
  );
};

export default Login;
