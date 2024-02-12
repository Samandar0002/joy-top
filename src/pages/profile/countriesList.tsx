import React, { useEffect, useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import { AxiosError } from 'axios';

import { http } from 'services';

import { IEntity } from 'modules/profile/types';

const CountryTable = () => {
  const [data, setData] = useState<IEntity.CountriesRes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteCountryId, setDeleteCountryId] = useState<number | null>(null);
  const [updateCountryId, setUpdateCountryId] = useState<number | null>(null);
  const [updateCountryNameUz, setUpdateCountryNameUz] = useState<string>('');
  const [updateCountryNameRu, setUpdateCountryNameRu] = useState<string>('');
  const [updateCountryNameEn, setUpdateCountryNameEn] = useState<string>('');
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [newCountryNameUz, setNewCountryNameUz] = useState<string>('');
  const [newCountryNameRu, setNewCountryNameRu] = useState<string>('');
  const [newCountryNameEn, setNewCountryNameEn] = useState<string>('');
  const [newCountryAction, setNewCountryAction] = useState<string>('');
  const [size, setSize] = useState<number>(15);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await http.get(`/country/pagination?page=0&size=${size}`);

        setData(data.content);
        setSize(data.totalElements);
        setLoading(false);
      } catch (err: any) {
        if (err instanceof AxiosError) {
          message.error('An error occurred while fetching data.');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [size]);

  const handleDelete = async (id: number) => {
    try {
      await http.delete(`country/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchData();
      message.success('Item deleted successfully');
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while deleting the item.');
      }
    } finally {
      setDeleteCountryId(null);
    }
  };

  const handleUpdate = async () => {
    try {
      if (updateCountryId && updateCountryNameUz && updateCountryNameRu && updateCountryNameEn) {
        await http.put(`country/${updateCountryId}`, {
          nameUz: updateCountryNameUz,
          nameRu: updateCountryNameRu,
          nameEn: updateCountryNameEn
        });
        setIsUpdateModalVisible(false);
        message.success('Country updated successfully');
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        fetchData();
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while updating the item.');
      }
    } finally {
      setDeleteCountryId(null);
      setUpdateCountryNameUz('');
      setUpdateCountryNameRu('');
      setUpdateCountryNameEn('');
    }
  };

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: "Siz ushbu hududni o'chirmoqchimisiz?",
      onOk: () => handleDelete(id),
      onCancel: () => setDeleteCountryId(null),
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: {
        style: {
          backgroundColor: '#ff7e47' // Change to your desired color
        }
      }
    });
  };

  const handleUpdateClick = (id: number, nameUz: string, nameRu: string, nameEn: string) => {
    setUpdateCountryId(id);
    setUpdateCountryNameUz(nameUz);
    setUpdateCountryNameRu(nameRu);
    setUpdateCountryNameEn(nameEn);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalVisible(false);
    setUpdateCountryId(null);
    setUpdateCountryNameUz('');
    setUpdateCountryNameRu('');
    setUpdateCountryNameEn('');
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
    setNewCountryNameUz('');
    setNewCountryNameRu('');
    setNewCountryNameEn('');
    setNewCountryAction('');
  };

  const addCountry = async () => {
    try {
      await http.post(`country`, {
        nameUz: newCountryNameUz,
        nameRu: newCountryNameRu,
        nameEn: newCountryNameEn,
        action: newCountryAction
      });
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchData();
      message.success('Country added successfully');
      setIsAddModalVisible(false);
      setNewCountryNameUz('');
      setNewCountryNameRu('');
      setNewCountryNameEn('');
      setNewCountryAction('');
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while adding the Country.');
      }
    }
  };

  return (
    <div className="container p-4">
      <div className="flex items-start justify-between">
        <h1 className="mb-4 text-2xl font-bold">Mamlakatlar list</h1>
        <button className="mb-2 me-2 rounded bg-[#ff7e47] px-5 py-2.5 text-white" onClick={showAddModal}>
          Qo'shish
        </button>
      </div>
      <table className="border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 font-normal text-gray-400">ID</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">NameUz</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">NameRu</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">NameEn</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: IEntity.ExtremeRes, idx: number) => (
              <tr key={item.id}>
                <td className="border-b px-4 py-2 text-center">{idx + 1}</td>
                <td className="border-b px-4 py-2 text-center">{item.nameUz}</td>
                <td className="border-b px-4 py-2 text-center">{item.nameRu}</td>
                <td className="border-b px-4 py-2 text-center">{item.nameEn}</td>
                <td className="border-b px-4 py-2">
                  <button
                    className="mb-2 me-2 rounded bg-[#ff7e47] px-5 py-2.5 text-white"
                    onClick={() => handleUpdateClick(item.id, item.nameUz, item.nameRu, item.nameEn)}
                  >
                    Update
                  </button>
                  <button
                    className="mb-2 me-2 rounded bg-[#f52c25] px-5 py-2.5 text-white"
                    onClick={() => showDeleteConfirm(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        title="Update Item"
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
          <Form.Item label="NameUz">
            <Input value={updateCountryNameUz} onChange={e => setUpdateCountryNameUz(e.target.value)} />
          </Form.Item>
          <Form.Item label="NameRu">
            <Input value={updateCountryNameRu} onChange={e => setUpdateCountryNameRu(e.target.value)} />
          </Form.Item>
          <Form.Item label="NameEn">
            <Input value={updateCountryNameEn} onChange={e => setUpdateCountryNameEn(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Qo'shish"
        visible={isAddModalVisible}
        onOk={addCountry}
        onCancel={handleAddModalCancel}
        okButtonProps={{
          style: {
            backgroundColor: '#ff7e47' // Change to your desired color
          }
        }}
      >
        <Form>
          <Form.Item label="NameUz">
            <Input value={newCountryNameUz} onChange={e => setNewCountryNameUz(e.target.value)} />
          </Form.Item>
          <Form.Item label="NameRu">
            <Input value={newCountryNameRu} onChange={e => setNewCountryNameRu(e.target.value)} />
          </Form.Item>
          <Form.Item label="NameEn">
            <Input value={newCountryNameEn} onChange={e => setNewCountryNameEn(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CountryTable;
function fetchData() {
  throw new Error('Function not implemented.');
}
function setDeleteItemId(arg0: null) {
  throw new Error('Function not implemented.');
}
