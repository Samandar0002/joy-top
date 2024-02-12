// ... (imports)

import { useEffect, useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import { AxiosError } from 'axios';

import { http } from 'services';

import { IEntity } from 'modules/profile/types';

const RegionTable = () => {
  const [data, setData] = useState<IEntity.RegionRes[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>();
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [updateItemId, setUpdateItemId] = useState<number | null>(null);
  const [updateItemNameUz, setUpdateItemNameUz] = useState<string>('');
  const [updateItemNameRu, setUpdateItemNameRu] = useState<string>('');
  const [updateItemNameEn, setUpdateItemNameEn] = useState<string>('');
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [newRegionNameUz, setNewRegionNameUz] = useState<string>('');
  const [newRegionNameRu, setNewRegionNameRu] = useState<string>('');
  const [newRegionNameEn, setNewRegionNameEn] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http.get(`region/all`, {});

        setData(data.data);
        setTotal(+data.data.totalElements);

        setIsLoading(false);
      } catch (err: any) {
        if (err instanceof AxiosError) {
          message.error('An error occurred while fetching data.');
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Consider adding dependencies or removing the dependency array.

  const handleDelete = async (id: number) => {
    try {
      await http.delete(`region/${id}`);
      // Reload data after successful deletion
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchData();
      message.success('Item deleted successfully');
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while deleting the item.');
      }
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setDeleteItemId(null);
    }
  };

  const handleUpdate = async () => {
    try {
      if (updateItemId && updateItemNameUz && updateItemNameRu && updateItemNameEn) {
        // Assuming your update API endpoint is /region/:id and requires a payload with name
        await http.put(`region/${updateItemId}`, {
          nameUz: updateItemNameUz,
          nameRu: updateItemNameRu,
          nameEn: updateItemNameEn
        });
        // Close the modal after a successful update
        setIsUpdateModalVisible(false);
        message.success('Item updated successfully');
        // Reload data after a successful update
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

  // Function to handle delete confirmation
  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: "Siz ushbu hududni o'chirmoqchimisiz?",
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
  const handleUpdateClick = (id: number, namUz: string, nameRu: string, nameEn: string) => {
    setUpdateItemId(id);
    setUpdateItemNameUz(namUz);
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

  // Function to handle closing the add region modal
  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
    // Clear the input fields
    setNewRegionNameUz('');
    setNewRegionNameRu('');
    setNewRegionNameEn('');
  };

  // Function to handle adding a new region
  const addRegion = async () => {
    try {
      // Replace the following line with your actual API endpoint and payload for adding a new region
      await http.post(`region`, {
        nameUz: newRegionNameUz,
        nameRu: newRegionNameRu,
        nameEn: newRegionNameEn
      });

      // Reload data after successful addition
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchData();
      message.success('Region added successfully');
      // Close the add region modal
      setIsAddModalVisible(false);
      // Clear the input fields
      setNewRegionNameUz('');
      setNewRegionNameRu('');
      setNewRegionNameEn('');
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while adding the region.');
      }
    }
  };

  return (
    <div className="container p-4">
      <div className="flex items-start justify-between">
        <h1 className="mb-4 text-2xl font-bold">Viloyatlar listi</h1>
        <button className="mb-2 me-2 rounded bg-[#ff7e47] px-5 py-2.5" onClick={showAddModal}>
          Qo'shish
        </button>
      </div>
      <table className="border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 font-normal text-gray-400">ID</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Hudud nomi Uz</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Hudud nomi Ру</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Hudud nomi En</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: IEntity.RegionRes, idx: number) => {
              console.log('item: ', item);

              return (
                <tr key={item.id}>
                  <td className="border-b px-4 py-2">{item.id}</td>
                  <td className="border-b px-4 py-2">{item.nameUz}</td>
                  <td className="border-b px-4 py-2">{item.nameEn}</td>
                  <td className="border-b px-4 py-2">{item.nameRu}</td>
                  <td className="border-b px-4 py-2">
                    <button
                      className="mb-2 me-2 rounded bg-[#ff7e47] px-5 py-2.5 text-white"
                      onClick={() => handleUpdateClick(item.id, item.nameUz, item.nameRu, item.nameEn)}
                    >
                      O'zgartirish
                    </button>
                    <button
                      className="mb-2  me-2 rounded bg-[#f52c25] px-5 py-2.5 text-white"
                      onClick={() => showDeleteConfirm(item.id)}
                    >
                      O'chirish
                    </button>
                  </td>
                </tr>
              );
            })}
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
          <Form.Item label="Tur bo'ladigan mamlakat">
            <select className="mb-4 flex rounded border p-2">
              <option value="">O'zbekiston</option>
              <option value="">Angliya</option>
              <option value="">AQSH</option>
            </select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="qo'shish"
        visible={isAddModalVisible}
        onOk={addRegion}
        onCancel={handleAddModalCancel}
        okButtonProps={{
          style: {
            backgroundColor: '#ff7e47' // Change to your desired color
          }
        }}
      >
        {/* Add region form */}
        <Form>
          <Form.Item label="O'zbekcha">
            <Input value={newRegionNameUz} onChange={e => setNewRegionNameUz(e.target.value)} />
          </Form.Item>
          <Form.Item label="Ruscha">
            <Input value={newRegionNameRu} onChange={e => setNewRegionNameRu(e.target.value)} />
          </Form.Item>
          <Form.Item label="Inglizcha">
            <Input value={newRegionNameEn} onChange={e => setNewRegionNameEn(e.target.value)} />
          </Form.Item>
          <Form.Item label="Tur bo'ladigan mamlakat">
            <select className="mb-4 flex rounded border p-2">
              <option value="">O'zbekiston</option>
              <option value="">Angliya</option>
              <option value="">AQSH</option>
            </select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RegionTable;
function fetchData() {
  throw new Error('Function not implemented.');
}
function setDeleteItemId(arg0: null) {
  throw new Error('Function not implemented.');
}
