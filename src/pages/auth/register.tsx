import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, message, Tag } from 'antd';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { sessionPhone } from 'services/session';

import { Api, Context } from 'modules/auth';
import { IForm } from 'modules/auth/types';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { methods } = useContext(Context);
  const { t } = useTranslation();
  // eslint-disable-next-line consistent-return
  const onFinish = async ({ confirmPassword, ...values }: IForm.Register) => {
    try {
      const { data } = await Api.Register(values);

      methods.phoneNumberConfirm(values.phone);
      sessionPhone.set(values.phone);
      navigate('/auth/confirm');
    } catch (error) {
      if (error instanceof AxiosError) message.error(error.response?.data);
    }
  };

  return (
    <div className="mt-5 flex w-[100vw] flex-col items-center justify-center">
      <Form title="Register Form" name="basic" onFinish={onFinish} className="mb-10 w-[400px]">
        <span>{t('First Name')}</span>
        <Form.Item<IForm.Register>
          name="firstName"
          rules={[{ required: true, message: t('Please enter your first name!') }]}
        >
          <Input size="large" placeholder={t('First Name')}className="py-3" />
        </Form.Item>
        <span>{t('Last Name')}</span>
        <Form.Item<IForm.Register>
          name="lastName"
          rules={[{ required: true, message: t('Please enter your last name!') }]}
        >
          <Input size="large" placeholder={t('Last Name')} className="py-3" />
        </Form.Item>
        <span>{t('Phone')}</span>
        <Form.Item<IForm.Register>
          name="phone"
          rules={[
            { required: true, message: t('Please enter your phone!') },
            { pattern: /^\d{9}$/, message: t('Phone must be at least 9 digits') }
          ]}
        >
          <Input type="string" prefix={<Tag className="py-2">+998</Tag>} size="large" placeholder={t("Phone")} />
        </Form.Item>
        <span>{t('Password')}</span>
        <Form.Item<IForm.Register>
          name="password"
          rules={[
            { required: true, message: t('Please enter your password!') },
            { min: 6, message: t('Password must be at least 6 characters') }
          ]}
        >
          <Input.Password size="large" placeholder={t("Password")} className="py-3" />
        </Form.Item>
        <span>{t('Confirm Password')}</span>
        <Form.Item<IForm.Register>
          name="confirmPassword"
          rules={[
            { required: true, message: t('Please enter your password!') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('The new password that you entered do not match!')));
              }
            })
          ]}
        >
          <Input.Password size="large" placeholder={t("Confirm Password")}className="py-3" />
        </Form.Item>

        <button className="buttons h-10 w-full" type="submit">
          {t('Register')}
        </button>
      </Form>
    </div>
  );
};

export default Register;
