import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, message, Tag } from 'antd';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { sessionPhone } from 'services/session';

import { Api, Context, Mappers } from 'modules/auth';
import { IForm } from 'modules/auth/types';

const Reset: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { methods } = useContext(Context);
  const { t } = useTranslation();
  const onFinish = async (values: IForm.ResendVerification) => {
    try {
      sessionPhone.set(values.phone);
      methods.phoneNumberConfirm(values.phone);
      const { data } = await Api.ResendVerification({ phone: `998${values.phone}` });
      const user = Mappers.User(data.data);

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      location.pathname === '/auth/confirm' && window.location.reload();

      navigate('/auth/confirm');
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error(err.response?.data);
      }
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2 className="absolute left-5 top-2">{t('Reset password')}</h2>
        <Form title="Reset Form" name="basic" onFinish={onFinish} className="mt-6 w-[300px]">
          <span>{t('Enter your phone number')}</span>
          <Form.Item<IForm.ResendVerification>
            name="phone"
            rules={[
              { required: true, message: t('Please enter your phone!') },

              { pattern: /^\d{9}$/, message:t('Phone must be at least 9 digits') }
            ]}
          >
            <Input prefix={<Tag className="py-2">+998</Tag>} size="large" placeholder={t("Phone")}/>
          </Form.Item>

          <button type="submit" className="buttons">
            {t('Send')}
          </button>
        </Form>
      </div>
    </>
  );
};

export default Reset;
