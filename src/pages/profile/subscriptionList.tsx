import React, { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import { AxiosError } from 'axios';

import { http } from 'services';

import { IEntity } from 'modules/profile/types';

const SubscriptionListTable = () => {
  const [subscriptionLists, setSubscriptionLists] = useState<IEntity.SubscriptionListRes[]>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [updateItemStatus, setUpdateItemStatus] = useState<string | null>();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
  const [size, setSize] = useState<number>(1);
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http.post(`/subscription/filter?page=0&size=${size}`, {});

        setSubscriptionLists(data.data.content);
        setSize(data.data.totalElements);
        setIsLoading(false);
      } catch (err: any) {
        if (err instanceof AxiosError) {
          message.error('An error occurred while fetching data.');
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [size]);

  const handleStatusChange = (value: React.SetStateAction<string | undefined>) => {
    setStatus(value);
  };

  const handleUpdate = async () => {
    try {
      if (updateItemStatus) {
        await http.put(`subscription`, {
          statue: updateItemStatus
        });
        setIsUpdateModalVisible(false);
        message.success('Item updated successfully');
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        fetchData();
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while updating the item.');
      }
    } finally {
      setUpdateItemStatus(null);
    }
  };

  const handleUpdateClick = (status: string) => {
    setUpdateItemStatus(status);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalVisible(false);
    setUpdateItemStatus(null);
  };

  return (
    <div className="container p-4">
      <div className="flex items-start justify-between">
        <h1 className="mb-4 text-2xl font-bold">Obunalar ro'yxati</h1>
      </div>
      <table className="border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Id</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Turi</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Narx</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Yaritilgan vaqt</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Kunlar</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Holati</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {subscriptionLists &&
            subscriptionLists.map((item: IEntity.SubscriptionListRes, idx: number) => (
              <tr key={item.id}>
                <td className="border-b px-4 py-2">{idx + 1}</td>
                <td className="border-b px-4 py-2">{item.placeType}</td>
                <td className="border-b px-4 py-2">{item.price}</td>
                <td className="border-b px-4 py-2">{item.startDate.slice(0, 10)}</td>
                <td className="border-b px-4 py-2">{item.days}</td>
                <td className="border-b px-4 py-2">{item.status}</td>
                <td className="border-b px-4 py-2">
                  <button
                    className="mb-2 me-2 rounded bg-[#ff7e47] px-5 py-2.5 text-white"
                    onClick={() => handleUpdateClick(item.status)}
                  >
                    O'zgartirish
                  </button>
                  <button className="mb-2 me-2 rounded bg-[#f52c25] px-5 py-2.5 text-white">O'chirish</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        title={"O'zgartirish"}
        visible={isUpdateModalVisible}
        onOk={handleUpdate}
        onCancel={handleUpdateModalCancel}
        okButtonProps={{
          style: {
            backgroundColor: '#ff7e47'
          }
        }}
      >
        <Form>
          <Form.Item label="Status">
            <select
              className="mb-4 flex rounded border p-2"
              value={updateItemStatus || status}
              onChange={e => handleStatusChange(e.target.value)}
            >
              <option value="ACTIVE">Faol</option>
              <option value="BLOCKED">Bloklangan</option>
              <option value="FINISH">Tugatish</option>
            </select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubscriptionListTable;
function fetchData() {
  throw new Error('Function not implemented.');
}
function setUpdateItemNameEn(startDate: string) {
  throw new Error('Function not implemented.');
}
