import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { AxiosError } from 'axios';

import { http } from 'services';

import { IEntity } from 'modules/profile/types';

import { Modal } from 'components';

const UserTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<IEntity.UserRes>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>();
  const [page, setPage] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const handleOpenModal = (userId: string | null | undefined) => {
    setModalOpen(true);
    setSelectedUserId(userId); // Set the selected user ID when opening the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http.post(`profile/admin/filter?page=${page}&size=20`, {});

        setData(data.data.content);
        setTotal(+data.data.totalElements);

        setIsLoading(false);
      } catch (err: any) {
        if (err instanceof AxiosError) {
          message.error('An error occurred while fetching data.');
        }
        setIsLoading(false);
      }
      console.log(data);
    };

    fetchData();
  }, [page]);

  const   handleDelete = async (userId: any) => {
    try {
      await http.delete(`profile/admin/${userId}`);

      message.success('User deleted successfully.');
    } catch (err) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while deleting the user.');
      }
    }
  };

  const handleStatusChange = async () => {
    try {
      const userId = selectedUserId; // You may need to adjust this based on your implementation

      console.log('Changing status for user:', userId);

      await http.put(`profile/admin/${userId}/status`, { id: userId, status: selectedStatus });

      // Close the modal and fetch updated data
      handleCloseModal();
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchData();

      message.success('Status changed successfully.');
    } catch (err) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while changing the status.');
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Profillar ro'yxati</h1>
      <table className="border-gray-300 bg-white">
        <thead>
          <tr>
            <th className=" border-b px-4 py-2  font-normal text-gray-400">ID</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Ism</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Famila</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Telefon Raqam</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Holati</th>
            <th className=" border-b px-4 py-2 font-normal text-gray-400">Rollar ro'yxati</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: IEntity.UserRes, idx: number) => (
              <tr key={item.id}>
                <td className=" border-b px-4 py-2 text-center">{idx + 1}</td>
                <td className=" border-b px-4 py-2 text-center">{item.firstName}</td>
                <td className=" border-b px-4 py-2 text-center">{item.lastName}</td>
                <td className=" border-b px-4 py-2 text-center">{item.phone}</td>
                <td className=" border-b px-4 py-2 text-center">{item.status}</td>
                <td className=" h-[20px] w-[100px] text-wrap break-words border-b px-4 py-2 text-center">
                  {item.roleList}
                </td>
                <td className=" flex justify-center border-b px-4 py-2">
                  <button
                    onClick={() => handleOpenModal(item.id)}
                    className="mb-2 me-2 rounded bg-[#ff7e47] px-5 py-2.5"
                  >
                    <svg
                      className="h-[20px] w-[20px] text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2"
                      />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="mb-2 me-2 rounded  bg-[#f44336] px-5 py-2.5">
                    <svg
                      className="h-[20px] w-[20px] text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                  </button>
                  <button className="mb-2 me-2 rounded bg-[#ff7e47] px-5 py-2.5">Role</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <h2 className="mb-4 font-bold">O'zgartirish</h2>
        <p className="mb-2">Status</p>
        <select
          className="mb-4 flex rounded border p-2"
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
        >
          <option selected>Select status</option>
          <option value="ACTIVE">Faol</option>
          <option value="NOT_ACTIVE">Noactive</option>
        </select>

        <button onClick={handleStatusChange} className="rounded bg-[#ff7e47] p-2 text-white">
          O'zgartirish{' '}
        </button>
        <button className=" p-2 text-gray-400" onClick={handleCloseModal}>
          Bekor qilish{' '}
        </button>
      </Modal>
    </div>
  );
};

export default UserTable;
function fetchData() {
  throw new Error('Function not implemented.');
}
