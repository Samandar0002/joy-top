import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select } from 'antd';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { http } from 'services';

import { Api } from 'modules/dashboard';
import { IApi, IEntity } from 'modules/dashboard/types';

import { Navigation } from 'pages/dashboard';

import { FilterModal, Loader } from 'components';

const { Option } = Select;

const Dacha: React.FC = () => {
  const [data, setData] = useState<IEntity.DachaRes[]>();
  const [country, setCountry] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);
  const [districtData, setDistrictData] = useState([]);
  const [convenienceData, setConvenience] = useState([]);
  const [number, setNumber] = useState<string | null>(null);
  const [subType, setSubType] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>();
  const [size, setSize] = useState(2);
  const [room, setRoom] = useState<number>(0);
  const [beedroom, setBedroom] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [regionData, setRegionData] = useState([]);
  const [payload, setPayload] = useState<IApi.Dacha.Request>({ type: 'COTTAGE' });
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const handleOpenModal = async () => {
    setModalOpen(true);
    try {
      const convenience = await http.get('/convenience/public');

      setConvenience(convenience.data.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while fetching data.');
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleApply = (value: any) => {
    const { priceFrom, priceTo, convenienceList } = value;

    setPayload({
      priceFrom: priceFrom === '' ? null : priceFrom,
      priceTo: priceTo === '' ? null : priceTo,
      bedRoomCount: beedroom === 0 ? null : beedroom,
      roomCount: room === 0 ? null : room,
      convenienceList,
      type: 'COTTAGE'
    });

    handleCloseModal();
  };

  const handleSearch = async () => {
    setPayload({
      countryId: country === '' ? null : country,
      districtId: district === '' ? null : district,
      number: number === '' ? null : number,
      regionId: region === '' ? null : region,
      subType: subType === '' ? null : subType,
      type: 'COTTAGE'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await Api.DachaList(size, payload);

        if (country) {
          const regions = await http.get(`/region/public/${country}`);

          setRegionData(regions.data.data);
        } else {
          setRegionData([]);
        }

        if (region) {
          const district = await http.get(`/district/public/regionId/${region}`);

          setDistrictData(district.data.data);
        } else {
          setDistrictData([]);
        }

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
  }, [size, country, region, payload]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="container mx-auto">
        <Navigation />
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-center gap-2 p-2">
          <Select
            className="rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-placement-bottom-start rs-picker-has-value rs-picker-cleanable w-32"
            value={country}
            placeholder="Country"
            onChange={value => setCountry(value)}
            suffixIcon={
              <CloseOutlined
                onClick={() => {
                  setCountry(null);
                  setRegion(null);
                  setDistrict(null);
                }}
              />
            }
          >
            <Option value="56">O`zbekiston</Option>
          </Select>

          <Select
            className="rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-placement-bottom-start rs-picker-has-value rs-picker-cleanable w-32"
            value={region}
            onChange={value => {
              setRegion(value);
              setDistrict(null);
            }}
            suffixIcon={
              <CloseOutlined
                onClick={() => {
                  setRegion(null);
                  setDistrict(null);
                }}
              />
            }
          >
            {regionData &&
              regionData.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.nameUz}
                </Option>
              ))}
          </Select>

          <Select
            className="w-32"
            value={district}
            onChange={value => setDistrict(value)}
            suffixIcon={<CloseOutlined onClick={() => setDistrict(null)} />}
          >
            {districtData &&
              districtData.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>

          <Input
            placeholder="Number"
            type="text"
            className="w-32"
            value={number!}
            onChange={e => setNumber(e.target.value)}
          />

          <Select
            className="rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-placement-bottom-start rs-picker-has-value rs-picker-cleanable w-32"
            value={subType}
            onChange={value => setSubType(value)}
            suffixIcon={<CloseOutlined onClick={() => setSubType(null)} />}
          >
            <Option value="RENT">Rent</Option>
            <Option value="SALE">Sale</Option>
          </Select>

          <Button type="text" className="search-input h-9 filter" onClick={handleOpenModal}>
            Filter
          </Button>

          <Button className="btn btn-fill btn-search h-9" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <h1 className="font-large ml-15 mx-auto my-10 w-[1240px] text-[26px] font-[500]">{t('Dacha')}</h1>
        {
          <div className="mx-auto flex max-w-[1240px] flex-wrap gap-[2px]">
            {data &&
              data.map(item => (
                // eslint-disable-next-line react/jsx-key
                <div
                  key={item.id}
                  className="hover:transform-tr relative m-1 h-[500px] w-[300px] rounded-md p-4 shadow-[-5px_0_10px_5px_#f4f4f4] hover:translate-y-[-5px] hover:shadow-lg"
                >
                  <Link to={`/dachas/joy/${item.id}`}>
                    <div className="card relative m-1">
                      <div className="label-container relative pb-2">
                        <img src={item.mainAttach.url} alt="" className="card-img h-[180px] w-full rounded-md" />
                      </div>

                      <div className="card-info flex flex-col gap-1">
                        <div className="flex w-full items-center justify-between">
                          <div className="flex flex-col items-start justify-start">
                            <h3 className="card-title">{item.subType}</h3>
                            <h3 className="card-title">Name: {item.name}</h3>
                          </div>
                          <h3 className="card-title text-end">{item.number}</h3>
                        </div>
                        <p className="card-price text-sm">
                          Days of the week: <span>{item.weekDayPrice}-UZS</span>
                        </p>
                        <p className="card-price text-sm">
                          Holidays: <span>{item.weekendPrice}-UZS</span>
                        </p>
                        <p className="align-items-center flex text-xs text-[#ff7e47]">
                          <img
                            className="mr-1"
                            src="http://sap.mazgi.uz/static/media/map-pin-small.b9e3fbf9.svg"
                            alt=""
                          />
                          {item.country.name}, {item.region.name}, {item.district.name}
                        </p>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex flex-col">
                            <p className="card-bedroom mt-2 flex">
                              <img
                                src="http://sap.mazgi.uz/static/media/bed.81f2fbce.svg"
                                alt="Кровать"
                                className="mr-1"
                                style={{ height: '20px' }}
                              />
                              <span style={{ marginLeft: '8px' }}>{item.singleBedRoomCount}</span>
                            </p>
                            <p className="card-bedroom mt-2 flex">
                              <img
                                src="http://sap.mazgi.uz/static/media/double-bed.59d7acef.svg"
                                alt=""
                                className="mr-1"
                                style={{ height: '20px' }}
                              />
                              <span style={{ marginLeft: '8px' }}>{item.doubleBedRoomCount}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <span className="absolute bottom-2 text-xs">{item.createdDate.slice(0, 10)}</span>
                </div>
              ))}
          </div>
        }
        <div className={`flex w-full justify-center ${total! <= size + 10 || total! <= 12 ? 'mt-10' : ''}`}>
          <button
            className={`standart-button my-4 w-[200px] rounded-sm ${total! <= size + 10 || total! <= 12 ? 'hidden' : ''}`}
            onClick={() => setSize(size + 12)}
          >
            Show more
          </button>
        </div>

        <FilterModal isOpen={modalOpen} onClose={handleCloseModal}>
          <div className="rs-drawer-body overflow-auto" style={{ height: '1204.5px' }}>
            <Form form={form} className="rs-form rs-form-vertical rs-form-fixed-width gap-3" onFinish={handleApply}>
              <h1 className="mb-10 text-lg font-bold">Filter</h1>
              <Form.Item>
                <p className="font-bold">Price</p>
                <div className="row">
                  <div>
                    <Form.Item name="priceFrom">
                      <Input type="number" placeholder="From" style={{ width: '250px' }} />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="priceTo">
                      <Input type="number" placeholder="To" style={{ width: '250px' }} />
                    </Form.Item>
                  </div>
                </div>
              </Form.Item>
              <p className="font-bold">Conveniences</p>
              <Form.Item name="convenienceList">
                <Select mode="multiple" style={{ width: '250px', zIndex: 10 }} placeholder="Select conveniences">
                  {convenienceData &&
                    convenienceData.map((item: any) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <p className="font-bold">Main Information</p>
                <Form.Item name="rooms">
                  <div className="mt-2" style={{ width: '380px' }}>
                    <p className="filter-text mr-3">Total number of rooms</p>
                    <div className="rs-input-group" style={{ width: '140px' }}>
                      <Button htmlType="button" onClick={() => setRoom(room! - 1)} disabled={room === 0}>
                        -
                      </Button>
                      <Input value={room} style={{ width: '50px' }} />
                      <Button htmlType="button" onClick={() => setRoom(room! + 1)}>
                        +
                      </Button>
                    </div>
                  </div>
                </Form.Item>
                <Form.Item name="beedrooms">
                  <div className="mt-2" style={{ width: '380px' }}>
                    <p className="filter-text mr-3">Bedrooms</p>
                    <div className="rs-input-group" style={{ width: '140px' }}>
                      <Button htmlType="button" onClick={() => setBedroom(beedroom! - 1)} disabled={beedroom === 0}>
                        -
                      </Button>
                      <Input name="beedroom" value={beedroom} style={{ width: '50px' }} />
                      <Button htmlType="button" onClick={() => setBedroom(beedroom! + 1)}>
                        +
                      </Button>
                    </div>
                  </div>
                </Form.Item>
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

export default Dacha;
