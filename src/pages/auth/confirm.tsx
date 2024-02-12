import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { session } from 'services';
import { sessionPhone } from 'services/session';

import { Api, Context, Mappers } from 'modules/auth';
import { IForm } from 'modules/auth/types';

import { Modal } from 'components';

import Reset from './resend';

const Confirm: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const context = React.useContext(Context);
  const { confirmNumber } = useContext(Context);
  const Phone = confirmNumber || sessionPhone.get();
  const onFinish = async (values: IForm.Verification) => {
    try {
      const { data } = await Api.Verification({ phone: `998${Phone}`, code: values.code });
      const user = Mappers.User(data.data);

      message.success(`Successfully logged in. Hi ${user.name}`);
      context.methods.login(user);
      session.set(user.token);
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error(err.response?.data);
      }
    }
  };

  return (
    <div className="mt-10 flex h-[500px] w-[100vw] flex-col items-center justify-center gap-2">
      <Form title="Login Form" name="basic" onFinish={onFinish} className="w-[300px]">
        <span>{t('Enter the code from SMS')}</span>
        <Form.Item<IForm.Verification> name="code" rules={[{ required: true, message: 'Please enter your phone!' }]}>
          <Input className="py-4" size="large" />
        </Form.Item>

        <button type="submit" className="buttons h-10 w-full">
          {t('Confirm')}
        </button>
      </Form>
      <span>{t('The code has been sent to')}</span>
      <span>+998{Phone}</span>
      <div className="pt-3 text-[#FF7E47]" onClick={handleOpenModal}>
        {t('Resend')}
      </div>
      <Link className="text-[#FF7E47]" to="/auth/register">
        {t('Another number')}
      </Link>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <Reset />
      </Modal>
    </div>
  );
};

export default Confirm;
