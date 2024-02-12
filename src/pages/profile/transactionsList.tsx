import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { AxiosError } from 'axios';

import { http } from 'services';

import { IEntity } from 'modules/profile/types';

const TransactionsListTable = () => {
  const [transactionsLists, setTransactionsLists] = useState<IEntity.TransactionsListRes[]>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [size, setSize] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http.post(`/transaction/filter?page=0&size=${size}`, {});

        setTransactionsLists(data.data.content);
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
            <th className="border-b px-4 py-2 font-normal text-gray-400">Kunlar</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Marta </th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Ta'rif rejasi summa</th>
            <th className="border-b px-4 py-2 font-normal text-gray-400">Holati</th>
          </tr>
        </thead>
        <tbody>
          {transactionsLists &&
            transactionsLists.map((item: IEntity.TransactionsListRes, idx: number) => (
              <tr key={item.id}>
                <td className="border-b px-4 py-2">{idx + 1}</td>
                <td className="border-b px-4 py-2">{item.placeType}</td>
                <td className="border-b px-4 py-2">{item.price}</td>
                <td className="border-b px-4 py-2">{item.days}</td>
                <td className="border-b px-4 py-2">{item.startDate}</td>
                <td className="border-b px-4 py-2">{}</td>
                <td className="border-b px-4 py-2">{item.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsListTable;
function fetchData() {
  throw new Error('Function not implemented.');
}
function setUpdateItemNameEn(startDate: string) {
  throw new Error('Function not implemented.');
}
