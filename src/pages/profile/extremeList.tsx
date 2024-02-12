import React, { useEffect, useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import { AxiosError } from 'axios';

import { http } from 'services';

import { IEntity } from 'modules/profile/types';

const ExtremeTable = () => {
  const [extremes, setExtremes] = useState<IEntity.ExtremeRes[]>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [updateItemId, setUpdateItemId] = useState<number | null>(null);
  const [updateItemNameUz, setUpdateItemNameUz] = useState<string>('');
  const [updateItemNameRu, setUpdateItemNameRu] = useState<string>('');
  const [updateItemNameEn, setUpdateItemNameEn] = useState<string>('');
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [newExtremeNameUz, setNewExtremeNameUz] = useState<string>('');
  const [newExtremeNameRu, setNewExtremeNameRu] = useState<string>('');
  const [newExtremeNameEn, setNewExtremeNameEn] = useState<string>('');
  const [newExtremeAction, setNewExtremeAction] = useState<string>('');
  const [size, setSize] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http.get(`/extreme-type?size=${size}`);

        console.log(data);
        setExtremes(data.content);
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
      await http.delete(`extreme-type/${id}`);
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
        await http.put(`extreme-type  /${updateItemId}`, {
          nameUz: updateItemNameUz,
          nameRu: updateItemNameRu,
          nameEn: updateItemNameEn
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

  const handleUpdateClick = (id: number, nameUz: string, nameRu: string, nameEn: string) => {
    setUpdateItemId(id);
    setUpdateItemNameUz(nameUz);
    setUpdateItemNameRu(nameRu);
    setUpdateItemNameEn(nameEn);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalVisible(false);
    setUpdateItemId(null);
    setUpdateItemNameUz('');
    setUpdateItemNameRu('');
    setUpdateItemNameEn('');
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
    setNewExtremeNameUz('');
    setNewExtremeNameRu('');
    setNewExtremeNameEn('');
    setNewExtremeAction('');
  };

  const addExtreme = async () => {
    try {
      await http.post(`extreme-type`, {
        nameUz: newExtremeNameUz,
        nameRu: newExtremeNameRu,
        nameEn: newExtremeNameEn,
        action: newExtremeAction
      });
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchData();
      message.success('Extreme activity added successfully');
      setIsAddModalVisible(false);
      setNewExtremeNameUz('');
      setNewExtremeNameRu('');
      setNewExtremeNameEn('');
      setNewExtremeAction('');
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while adding the extreme activity.');
      }
    }
  };

  return (
    <div className="container p-4">
      <div className="flex items-start justify-between">
        <h1 className="mb-4 text-2xl font-bold">Ekstremallar listi</h1>
        <button className="mb-2 me-2 rounded bg-[#ff7e47] px-5 py-2.5 text-white" onClick={showAddModal}>
          Qo'shish
        </button>
      </div>
      <table className="border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 font-normal text-gray-400">ID</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Ekstremal ismUz</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Ekstremal ismRu</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Ekstremal ismEn</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Harakat</th>
          </tr>
        </thead>
        <tbody>
          {extremes &&
            extremes.map((item: IEntity.ExtremeRes, idx: number) => (
              <tr key={item.id}>
                <td className="border-b px-4 py-2">{idx + 1}</td>
                <td className="border-b px-4 py-2">{item.nameUz}</td>
                <td className="border-b px-4 py-2">{item.nameRu}</td>
                <td className="border-b px-4 py-2">{item.nameUz}</td>
                <td className="border-b px-4 py-2">
                  <button
                    className="mb-2 me-2 rounded bg-[#ff7e47] px-5 py-2.5 text-white"
                    onClick={() => handleUpdateClick(item.id, item.nameUz, item.nameUz, item.nameEn)}
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
        </Form>
      </Modal>
      <Modal title="Qo'shish" visible={isAddModalVisible} onOk={addExtreme} onCancel={handleAddModalCancel}>
        <Form>
          <Form.Item label="O'zbekcha">
            <Input value={newExtremeNameUz} onChange={e => setNewExtremeNameUz(e.target.value)} />
          </Form.Item>
          <Form.Item label="Ruscha">
            <Input value={newExtremeNameRu} onChange={e => setNewExtremeNameRu(e.target.value)} />
          </Form.Item>
          <Form.Item label="Inglizcha">
            <Input value={newExtremeNameEn} onChange={e => setNewExtremeNameEn(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExtremeTable;
function fetchData() {
  throw new Error('Function not implemented.');
}
