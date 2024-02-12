import React, { useEffect, useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import { AxiosError } from 'axios';

import { http } from 'services';

import { IEntity } from 'modules/profile/types';

const SubscriptionTable = () => {
  const [Subscriptions, setSubscriptions] = useState<IEntity.SubscriptionRes[]>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [updateItemId, setUpdateItemId] = useState<number | null>(null);
  const [updateItemNameUz, setUpdateItemNameUz] = useState<string>('');
  const [updateItemNameRu, setUpdateItemNameRu] = useState<string>('');
  const [updateItemNameEn, setUpdateItemNameEn] = useState<string>('');
  const [updateItemPrice, setUpdateItemPrice] = useState<number | null>();
  const [updateItemOrderNumber, setUpdateItemOrderNumber] = useState<number | null>();
  const [updateItemDays, setUpdateItemDays] = useState<number | null>();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [newSubscriptionNameUz, setNewSubscriptionNameUz] = useState<string>('');
  const [newSubscriptionNameRu, setNewSubscriptionNameRu] = useState<string>('');
  const [newSubscriptionNameEn, setNewSubscriptionNameEn] = useState<string>('');
  const [newSubscriptionPrice, setNewSubscriptionPrice] = useState<number | null>();
  const [newSubscriptionOrderNumber, setNewSubscriptionOrderNumber] = useState<number | null>();
  const [newSubscriptionDays, setNewSubscriptionDays] = useState<number | null>();
  const [size, setSize] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http.get(`/tariff/all`);

        console.log(data);
        setSubscriptions(data.data);
        setSize(data.totalElements);
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

  const handleDelete = async (id: number) => {
    try {
      await http.delete(`tariff/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchData();
      message.success('Item deleted successfully');
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while deleting the item.');
      }
    } finally {
      setDeleteItemId(null);
    }
  };

  const handleUpdate = async () => {
    try {
      if (updateItemId && updateItemNameUz && updateItemNameRu && updateItemNameEn) {
        await http.put(`tariff/${updateItemId}`, {
          nameUz: updateItemNameUz,
          nameRu: updateItemNameRu,
          nameEn: updateItemNameEn,
          price: updateItemPrice,
          orderNumber: updateItemOrderNumber,
          days: updateItemDays
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
      setUpdateItemId(null);
      setUpdateItemNameUz('');
      setUpdateItemNameRu('');
      setUpdateItemNameEn('');
      setUpdateItemPrice(null);
      setUpdateItemOrderNumber(null);
      setUpdateItemDays(null);
    }
  };

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: "Siz ushbu ekstremal harakatni o'chirmoqchimisiz?",
      onOk: () => handleDelete(id),
      onCancel: () => setDeleteItemId(null),
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: {
        style: {
          backgroundColor: '#ff7e47' // Change to your desired color
        }
      }
    });
  };

  const handleUpdateClick = (
    id: number,
    nameUz: string,
    nameRu: string,
    nameEn: string,
    price: number,
    orderNumber: number,
    days: number
  ) => {
    setUpdateItemId(id);
    setUpdateItemNameUz(nameUz);
    setUpdateItemNameRu(nameRu);
    setUpdateItemNameEn(nameEn);
    setUpdateItemPrice(price);
    setUpdateItemOrderNumber(orderNumber);
    setUpdateItemDays(days);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalVisible(false);
    setUpdateItemId(null);
    setUpdateItemNameUz('');
    setUpdateItemNameRu('');
    setUpdateItemNameEn('');
    setUpdateItemPrice(null);
    setUpdateItemOrderNumber(null);
    setUpdateItemDays(null);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
    setNewSubscriptionNameUz('');
    setNewSubscriptionNameRu('');
    setNewSubscriptionNameEn('');
    setNewSubscriptionPrice(null);
    setNewSubscriptionOrderNumber(null);
    setNewSubscriptionDays(null);
  };

  const addSubscription = async () => {
    try {
      await http.post(`tariff`, {
        nameUz: newSubscriptionNameUz,
        nameRu: newSubscriptionNameRu,
        nameEn: newSubscriptionNameEn,
        price: newSubscriptionPrice,
        orderNumber: newSubscriptionOrderNumber,
        days: newSubscriptionDays
      });
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchData();

      message.success('Subscription activity added successfully');
      setIsAddModalVisible(false);
      setNewSubscriptionNameUz('');
      setNewSubscriptionNameRu('');
      setNewSubscriptionNameEn('');
      setNewSubscriptionPrice(null);
      setNewSubscriptionOrderNumber(null);
      setNewSubscriptionDays(null);
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while adding the Subscription activity.');
      }
    }
  };

  return (
    <div className="container p-4">
      <div className="flex items-start justify-between">
        <h1 className="mb-4 text-2xl font-bold">Qulayliklar listi</h1>
        <button className="mb-2 me-2 rounded bg-[#ff7e47] px-5 py-2.5 text-white" onClick={showAddModal}>
          Qo'shish
        </button>
      </div>
      <table className="border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 font-normal text-gray-400">ID</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Qulayliklar ismUz</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Qulayliklar ismRu</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Qulayliklar ismEn</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Narx</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Raqam</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Kunlar</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Harakat</th>
          </tr>
        </thead>
        <tbody>
          {Subscriptions &&
            Subscriptions.map((item: IEntity.SubscriptionRes, idx: number) => (
              <tr key={item.id}>
                <td className="border-b px-4 py-2">{idx + 1}</td>
                <td className="border-b px-4 py-2">{item.nameUz}</td>
                <td className="border-b px-4 py-2">{item.nameRu}</td>
                <td className="border-b px-4 py-2">{item.nameEn}</td>
                <td className="border-b px-4 py-2">{item.price}</td>
                <td className="border-b px-4 py-2">{item.orderNumber}</td>
                <td className="border-b px-4 py-2">{item.days}</td>
                <td className="border-b px-4 py-2">
                  <button
                    className="mb-2 me-2 rounded bg-[#ff7e47] px-5 py-2.5 text-white"
                    onClick={() =>
                      handleUpdateClick(
                        item.id,
                        item.nameUz,
                        item.nameUz,
                        item.nameEn,
                        item.price,
                        item.orderNumber,
                        item.days
                      )
                    }
                  >
                    O'zgartirish
                  </button>
                  <button
                    className="mb-2 me-2 rounded bg-[#f52c25] px-5 py-2.5 text-white"
                    onClick={() => showDeleteConfirm(item.id)}
                  >
                    O'chirish
                  </button>
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
            backgroundColor: '#ff7e47' // Change to your desired color
          }
        }}
      >
        <Form>
          <Form.Item label="O'zbekcha">
            <Input value={updateItemNameUz} onChange={e => setUpdateItemNameUz(e.target.value)} />
          </Form.Item>
          <Form.Item label="Ruscha">
            <Input value={updateItemNameRu} onChange={e => setUpdateItemNameRu(e.target.value)} />
          </Form.Item>
          <Form.Item label="Inglizcha">
            <Input value={updateItemNameEn} onChange={e => setUpdateItemNameEn(e.target.value)} />
          </Form.Item>
          <Form.Item label="Narx">
            <Input value={updateItemPrice!} onChange={e => setUpdateItemPrice(+e.target.value)} />
          </Form.Item>
          <Form.Item label="Raqam">
            <Input value={updateItemOrderNumber!} onChange={e => setUpdateItemOrderNumber(+e.target.value)} />
          </Form.Item>
          <Form.Item label="Kunlar">
            <Input value={updateItemDays!} onChange={e => setUpdateItemDays(+e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Qo'shish"
        visible={isAddModalVisible}
        onOk={addSubscription}
        onCancel={handleAddModalCancel}
        okButtonProps={{
          style: {
            backgroundColor: '#ff7e47' // Change to your desired color
          }
        }}
      >
        <Form>
          <Form.Item label="O'zbekcha">
            <Input value={newSubscriptionNameUz} onChange={e => setNewSubscriptionNameUz(e.target.value)} />
          </Form.Item>
          <Form.Item label="Ruscha">
            <Input value={newSubscriptionNameRu} onChange={e => setNewSubscriptionNameRu(e.target.value)} />
          </Form.Item>
          <Form.Item label="Inglizcha">
            <Input value={newSubscriptionNameEn} onChange={e => setNewSubscriptionNameEn(e.target.value)} />
          </Form.Item>
          <Form.Item label="Narx">
            <Input value={newSubscriptionPrice!} onChange={e => setNewSubscriptionPrice(+e.target.value)} />
          </Form.Item>
          <Form.Item label="Raqam">
            <Input value={newSubscriptionOrderNumber!} onChange={e => setNewSubscriptionOrderNumber(+e.target.value)} />
          </Form.Item>
          <Form.Item label="Kunlar">
            <Input value={newSubscriptionDays!} onChange={e => setNewSubscriptionDays(+e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubscriptionTable;
function fetchData() {
  throw new Error('Function not implemented.');
}
