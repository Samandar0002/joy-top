import { useState } from 'react';
import { DatePicker, Form, Input, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { AxiosError } from 'axios';
import { GlobalApi } from 'utils';

import ChatModal from './chatModal';

function Chat() {
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line consistent-return
  const onFinish = async (values: any) => {
    const fromDay = values.fromDay.format('YYYY-MM-DD');
    const toDay = values.toDay.format('YYYY-MM-DD');

    try {
      const { data } = await GlobalApi.Message({
        ...values,
        fromDay,
        toDay
      });

      message.success(`Message sent successfully`);
    } catch (error) {
      if (error instanceof AxiosError) message.error(error.response?.data);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="chat-modal-icon">
      <span>
        <svg
          width="40"
          height="40"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleOpenModal}
        >
          <path
            d="M11.3619 7.17183C10.8463 7.17183 10.4468 7.53143 10.4468 7.9754C10.4468 8.41937 10.8463 8.77897 11.3619 8.77897C11.8329 8.77897 12.2325 8.41937 12.2325 7.9754C12.2325 7.53143 11.8329 7.17183 11.3619 7.17183ZM5.11194 7.17183C4.59631 7.17183 4.19676 7.53143 4.19676 7.9754C4.19676 8.41937 4.59631 8.77897 5.11194 8.77897C5.58292 8.77897 5.98247 8.41937 5.98247 7.9754C5.98247 7.53143 5.58292 7.17183 5.11194 7.17183Z"
            fill="currentColor"
          />
          <path
            d="M18.5265 5.64348C17.4938 4.36407 16.0046 3.44223 14.3077 3.03187V3.03388C13.926 2.65218 13.4952 2.30062 13.0131 1.98723C9.35908 -0.403398 4.22961 0.325843 1.5622 3.61446C-0.587352 6.28633 -0.495834 9.88031 1.69613 12.4337L1.71399 15.0975C1.71399 15.1618 1.72515 15.2261 1.74747 15.2863C1.77555 15.3668 1.82098 15.4416 1.88118 15.5062C1.94138 15.5709 2.01515 15.6243 2.09829 15.6633C2.18142 15.7023 2.27229 15.7262 2.36568 15.7335C2.45907 15.7409 2.55316 15.7316 2.64256 15.7062L5.46845 14.9046C6.21622 15.1437 6.98854 15.2803 7.7564 15.3185L7.74524 15.3265C9.73408 16.6303 12.3412 17.022 14.7318 16.3109L17.5689 17.1426C17.6403 17.1627 17.714 17.1747 17.7899 17.1747C18.185 17.1747 18.5042 16.8874 18.5042 16.5319V13.8399C20.4707 11.4372 20.522 8.11647 18.5265 5.64348ZM5.78095 13.4783L5.5131 13.3778L3.30327 14.0006L3.28095 11.9113L3.10238 11.7305C1.21399 9.65732 1.08899 6.67004 2.85685 4.47830C5.00863 1.82249 9.13363 1.23589 12.0756 3.15241C15.0265 5.08299 15.6805 8.78946 13.5488 11.4292C11.7609 13.6370 8.55997 14.4526 5.78095 13.4783ZM17.0533 13.1368L16.8747 13.3377L16.897 15.427L14.7095 14.764L14.4417 14.8645C13.1917 15.2823 11.8591 15.3165 10.6247 15.0051L10.6202 15.0031C12.3167 14.5348 13.7987 13.5839 14.8435 12.293C16.5488 10.1776 16.8256 7.51982 15.8345 5.25374L15.8479 5.26178C16.3613 5.59325 16.8323 6.00709 17.2318 6.50732C18.8524 8.50821 18.7609 11.2323 17.0533 13.1368Z"
            fill="currentColor"
          />
          <path
            d="M8.23694 7.17183C7.72131 7.17183 7.32176 7.53143 7.32176 7.9754C7.32176 8.41937 7.72131 8.77897 8.23694 8.77897C8.70792 8.77897 9.10747 8.41937 9.10747 7.9754C9.10747 7.53143 8.70792 7.17183 8.23694 7.17183Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <ChatModal isOpen={modalOpen} onClose={handleCloseModal}>
        <Form
          className="rs-form rs-form-vertical rs-form-fixed-width pt-4"
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <div className="row">
            <div className="col-12">
              <div className="row" style={{ marginLeft: '0px' }}>
                <Form.Item name="price" rules={[{ required: true, message: 'Please enter price' }]}>
                  <Input placeholder="Approximate price" type="number" addonAfter="UZS" />
                </Form.Item>
              </div>

              <div className="chat-modal-time">
                <div className="row">
                  <div className="col-6" style={{ paddingRight: '5px', marginBottom: '30px' }}>
                    <div className="chat-modal-time-input">
                      <Form.Item name="fromDay" rules={[{ required: true, message: 'Please enter entrance' }]}>
                        <DatePicker placeholder="Entrance" style={{ width: '100%' }} />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-6" style={{ paddingLeft: '5px', marginBottom: '30px' }}>
                    <div className="chat-modal-time-input">
                      <Form.Item name="toDay" rules={[{ required: true, message: 'Please enter until' }]}>
                        <DatePicker placeholder="Until" style={{ width: '100%' }} />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="product-box2 mt-1">
                <Form.Item name="text" rules={[{ required: true, message: 'Please enter your message' }]}>
                  <TextArea rows={5} placeholder="Leave your message" style={{ width: '100%', resize: 'none' }} />
                </Form.Item>

                <Form.Item name="phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                  <Input placeholder="Phone Number" style={{ width: '100%' }} />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="row m-0 mt-3">
            <Form.Item>
              <button type="submit" className=" buttons hover: font-red w-full">
                Send request
              </button>
            </Form.Item>
          </div>
        </Form>
      </ChatModal>
    </div>
  );
}

export default Chat;
