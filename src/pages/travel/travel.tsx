import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select } from 'antd';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { Api } from 'modules/dashboard';
import { IApi, IEntity } from 'modules/dashboard/types';

import { Navigation } from 'pages/dashboard';

import { FilterModal, Loader } from 'components';

const { Option } = Select;

const Travel: React.FC = () => {
  const [data, setData] = useState<IEntity.TourRes[]>();
  const [country, setCountry] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>();
  const [size, setSize] = useState(12);
  const [modalOpen, setModalOpen] = useState(false);
  const [payload, setPayload] = useState<IApi.Tour.Request>({});

  const [form] = Form.useForm();

  const handleOpenModal = async () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleApply = (value: any) => {
    const { companyName } = value;

    setPayload({
      companyName: companyName === '' ? null : companyName,
    });

    handleCloseModal();
  };

  const handleSearch = async () => {
    setPayload({
      countryId: country === '' ? null : country,
      priceFrom: from === '' ? null : from,
      priceTo: to === '' ? null : to,
    });
  };
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await Api.TourList(size, payload);

        setData(data.data.content);
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
  }, [size, country, payload]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="container mx-auto">
        <Navigation />
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-center gap-2 p-2">
          <Input
            placeholder="From"
            type="text"
            className="w-32"
            value={from!}
            onChange={e => setFrom(e.target.value)}
          />

          <Input placeholder="to" type="text" className="w-32" value={to!} onChange={e => setTo(e.target.value)} />

          <Select
            className="rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-placement-bottom-start rs-picker-has-value rs-picker-cleanable w-32"
            value={country}
            placeholder="Country"
            onChange={value => setCountry(value)}
            suffixIcon={<CloseOutlined onClick={() => setCountry(null)} />}
          >
            <Option value="56">O`zbekiston</Option>
          </Select>

          <Button type="text" className="search-input h-9 filter" onClick={handleOpenModal}>
            Filter
          </Button>

          <Button className="btn btn-fill btn-search h-9" onClick={handleSearch}>
            Search
          </Button>
        </div>

        <h1 className="font-large ml-15 mx-auto my-10 w-[1240px] text-[26px] font-[500]">{t('Sayohat')}</h1>
        {
          <div className="mx-auto flex max-w-[1240px] flex-wrap gap-[2px]">
            {data &&
              data.map(item => (
                // eslint-disable-next-line react/jsx-key
                <div className="hover:transform-tr relative m-1 h-[500px] w-[300px] rounded-md p-4 shadow-[-5px_0_10px_5px_#f4f4f4] hover:translate-y-[-5px] hover:shadow-lg">
                  <Link to={`/tours/joy/${item.id}`}>
                    <div className="card relative m-1">
                      <div className="label-container relative pb-2">
                        <img src={item.mainAttach.url} alt="" className="card-img h-[180px] w-full rounded-md" />
                      </div>

                      <div className="card-info flex flex-col gap-2">
                        <div className="flex w-full items-center justify-between">
                          <div className="flex flex-col items-start justify-start">
                            <h3 className="card-title">Name: {item.companyName}</h3>
                          </div>
                        </div>
                        <p className="card-price text-sm">Srarting price: {item.standardsPrice}-UZS</p>
                        <p className="align-items-center flex text-sm text-[#ff7e47]">
                          <img
                            className="mr-1"
                            src="http://sap.mazgi.uz/static/media/map-pin-small.b9e3fbf9.svg"
                            alt=""
                          />
                          {item.country.name}, {item.region.name}, {item.district.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <span className="absolute bottom-2 text-xs">{item.createdDate.slice(0, 10)}</span>
                </div>
              ))}
          </div>
        }
        <div className={`flex w-full justify-center ${total! <= size || total! <= 12 ? 'mt-10' : ''}`}>
          <button
            className={`standart-button my-4 w-[200px] rounded-sm ${total! <= size || total! <= 12 ? 'hidden' : ''}`}
            onClick={() => setSize(size + 12)}
          >
            Show more
          </button>
        </div>
        <FilterModal isOpen={modalOpen} onClose={handleCloseModal}>
          <div className="rs-drawer-body overflow-auto" style={{ height: '1204.5px' }}>
            <Form form={form} className="rs-form rs-form-vertical rs-form-fixed-width gap-3" onFinish={handleApply}>
              <h1 className="mb-10 text-lg font-bold">Filter</h1>
              <p className="font-bold">Main Information</p>
              <Form.Item name="companyName">
                <Input
                  placeholder="Company Name"
                  type="text"
                  className="w-40"
                  value={name!}
                  onChange={e => setName(e.target.value)}
                />
              </Form.Item>
              <div className="row mt-5">
                <button type="submit" className="buttons mr-2">
                  Apply
                </button>
                <Button type="default" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </FilterModal>
      </div>
    </>
  );
};

export default Travel;
