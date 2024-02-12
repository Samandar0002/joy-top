/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import { message, Select } from 'antd';
import { AxiosError } from 'axios';
import { IoMdCloseCircle } from 'react-icons/io';

import { http } from 'services';

import { Api } from 'modules/add';
import { Context } from 'modules/auth';

import { Loader } from 'components';

const { Option } = Select;

const Villas: React.FC = () => {
  const { user } = useContext(Context);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<number | null>();
  const [region, setRegion] = useState<number | null>();
  const [district, setDistrict] = useState<number | null>();
  const [territory, setTerritory] = useState<number | null>();
  const [regionData, setRegionData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [territoryData, setTerritoryData] = useState([]);
  const [convenienceData, setConvenienceData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [smoking, setSmoking] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [pets, setPets] = useState(false);
  const [family, setFamily] = useState(false);
  const [music, setMusic] = useState(false);
  const [party, setParty] = useState(false);
  const [youTube, setYouTube] = useState('');
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState('');
  const [singleBad, setSingleBad] = useState('');
  const [doubleBad, setDoubleBad] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [priceDay, setPriceDay] = useState('');
  const [subType, setSubType] = useState('RENT');
  const [priceSale, setPriceSale] = useState('');
  const [priceWeekDay, setPriceWeekDay] = useState('');
  const [deposit, setDeposit] = useState<number>();
  const [entrace, setEntrace] = useState('');
  const [until, setUntil] = useState('');
  const [phone, setPhone] = useState(`${user?.phone}`);

  const navigate = useNavigate();

  const handleCheckboxSmoking = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSmoking(event.target.checked);
  };
  const handleCheckboxAlcohol = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlcohol(event.target.checked);
  };
  const handleCheckboxPets = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPets(event.target.checked);
  };
  const handleCheckboxFamily = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFamily(event.target.checked);
  };
  const handleCheckboxMusic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMusic(event.target.checked);
  };
  const handleCheckboxParty = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParty(event.target.checked);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const selectedImages: File[] = Array.from(files);

      setSelectedFiles(prevFiles => [...prevFiles, ...selectedImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...selectedFiles];

    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const onFinish = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const up = [...selectedFiles];

      for (let i = 0; i < 3; i++) {
        formData.append(`additionalProp${i + 1}`, up[i]);
      }

      const upload = await Api.uploadImg(formData);

      console.log(upload);
      const payload = {
        attachList: [
          { id: `${upload.data.data[0].id}`, url: `${upload.data.data[0].url}` },
          { id: `${upload.data.data[1].id}`, url: `${upload.data.data[1].url}` },
          { id: `${upload.data.data[2].id}`, url: `${upload.data.data[2].url}` }
        ],
        alcohol: alcohol!,
        availableOnlyFamily: family!,
        calendarList: [],
        contact: user?.phone,
        convenienceList: [{ id: 3 }, { id: 5 }, { id: 7 }],
        countryId: country,
        departureTime: entrace,
        districtId: district,
        doubleBedRoomCount: doubleBad,
        enterTime: until,
        gageOfDeposit: deposit,
        loudlyMusic: music,
        type: 'COTTAGE',
        name: name!,
        priceOnSale: priceSale,
        regionId: region,
        roomCount: rooms,
        singleBedRoomCount: singleBad,
        smoking: smoking!,
        subType: subType!,
        totalArea: totalArea!,
        videoUrl: youTube,
        weekDayPrice: priceDay,
        weekendPrice: priceWeekDay
      };
      const { data } = await Api.addDacha(payload);

      message.success('Add dacha successfully', data.message);
      navigate('/dachas');
      setIsLoading(false);
    } catch (err: any) {
      if (err instanceof AxiosError) {
        message.error('An error occurred while fetching data.');
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const convenience = await http.get('/convenience/public');

        setConvenienceData(convenience.data.data);

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

        if (district) {
          const territory = await http.get(`/district/public/regionId/${region}`);

          setTerritoryData(territory.data.data);
        } else {
          setTerritoryData([]);
        }

        setIsLoading(false);
      } catch (err: any) {
        if (err instanceof AxiosError) {
          message.error('An error occurred while fetching data.');
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [country, region]);

  if (loading) return <Loader />;

  return (
    <form className="flex h-full flex-col gap-10">
      <div className="flex h-full w-full justify-center">
        <div className="flex flex-col gap-6 p-12">
          <h1 className="text-4xl">Elon Joylash: Villas</h1>
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex gap-6 p-5">
              <div className="flex h-[300px] w-[465px] flex-col items-center justify-center gap-4 rounded-md border border-solid p-4">
                <div className="flex flex-col items-center justify-center gap-3">
                  <input
                    type="file"
                    className="h-[30px] w-[126px] rounded-md bg-orange-500 text-white"
                    onChange={handleFileChange}
                    multiple
                  />
                </div>
                <div className="text-sm">
                  <p>Rasmlar soni 3ta dan ko`p bo'lmasligi kerak</p>
                  <p>Har bir rasm hajmi 3Mb dan katta bo'lmasin</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-5">
              {selectedFiles.map((file, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="relative flex h-20 w-20 flex-wrap items-center gap-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`${index + 1}`}
                    className="rounded-md border border-solid"
                    style={{ height: '100px', width: '100px' }}
                  />
                  <button className="absolute right-[-15px] top-[-5px]" onClick={() => handleRemoveImage(index)}>
                    <IoMdCloseCircle />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Video */}
          <div className="p-5">
            <h1>Video Qo'shing</h1>
            <div className="flex items-center gap-4">
              <div className="flex h-[50px] w-[100px] items-center justify-center rounded-md border border-solid bg-gray-100">
                Video Link
              </div>
              <input
                type="text"
                value={youTube}
                placeholder="youtube.com"
                className="h-[50px] w-[365px] rounded-md border border-solid p-2"
                onChange={e => setYouTube(e.target.value)}
              />
            </div>
          </div>
          <div className="p-5">
            <h1 className="pb-2 text-2xl">Manzil</h1>
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col">
                <p>Mamlakat</p>
                <Select
                  className="rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-placement-bottom-start rs-picker-has-value rs-picker-cleanable h-[60px] w-[300px] w-[300px] rounded-md"
                  value={country}
                  placeholder="Country"
                  onChange={value => setCountry(value)}
                  aria-required
                  suffixIcon={
                    <CloseOutlined
                      onClick={() => {
                        setCountry(null);
                        setRegion(null);
                        setDistrict(null);
                        setTerritory(null);
                      }}
                    />
                  }
                >
                  <Option value={56}>O`zbekiston</Option>
                </Select>
                <p>Viloyat</p>
                <Select
                  className="rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-placement-bottom-start rs-picker-has-value rs-picker-cleanable h-[60px] w-32 w-[300px]  w-[300px]"
                  value={region}
                  placeholder="Region"
                  aria-required
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
                <p>Shahar/Tuman</p>
                <Select
                  className="rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-placement-bottom-start rs-picker-has-value rs-picker-cleanable h-[60px] w-32 w-[300px]  w-[300px]"
                  value={district}
                  placeholder="District"
                  aria-required
                  onChange={value => {
                    setDistrict(value);
                    setTerritory(null);
                  }}
                  suffixIcon={
                    <CloseOutlined
                      onClick={() => {
                        setDistrict(null);
                        setTerritory(null);
                      }}
                    />
                  }
                >
                  {districtData &&
                    districtData.map((item: any) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
                {/* <p>Hudud</p>
                <Select
                  className=" rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-placement-bottom-start rs-picker-has-value rs-picker-cleanable h-[60px] w-[300px] rounded-md"
                  value={territory}
                  placeholder="Territory"
                  onChange={value => setTerritory(value)}
                  suffixIcon={
                    <CloseOutlined
                      onClick={() => {
                        setTerritory(null);
                      }}
                    />
                  }
                >
                  {territoryData &&
                    territoryData.map((item: any) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                </Select> */}
              </div>
            </div>
            <div className="flex items-center gap-6 pt-5">
              <div className="flex flex-col gap-2">
                <p className="text-2xl">Asosiy ma'lumot</p>
                <p>Nomi (ixtiyoriy)</p>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="h-[52px] w-[282px] rounded-md border border-solid p-2"
                />
              </div>
              <div className="ml-5 mt-10">
                <p>Xonalar soni</p>
                <input
                  type="text"
                  value={rooms}
                  required
                  onChange={e => setRooms(e.target.value)}
                  className="h-[52px] w-[282px] rounded-md border border-solid p-2"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-2">
                <p>Bir o'rinlik yotoq soni</p>
                <input
                  type="text"
                  required
                  value={singleBad}
                  onChange={e => setSingleBad(e.target.value)}
                  className="h-[52px] w-[282px] rounded-md border border-solid p-2"
                />
              </div>
              <div className="ml-5 mt-3">
                <p>Ikki o'rinlik yotoq soni</p>
                <input
                  type="text"
                  value={doubleBad}
                  required
                  onChange={e => setDoubleBad(e.target.value)}
                  className="h-[52px] w-[282px] rounded-md border border-solid p-2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="p-2">Umumiy maydoni (ixtiyoriy)</p>
              <input
                type="text"
                value={totalArea}
                onChange={e => setTotalArea(e.target.value)}
                className="h-[52px] w-full rounded-md border border-solid p-2"
              />
            </div>
            <div className="mt-8">
              <p>Telefon raqamingizni kiriting</p>
              <input
                type="text"
                value={phone}
                required
                onChange={e => setPhone(e.target.value)}
                placeholder="Telefon raqam"
                className="h-[50px] w-[300px] rounded-md border border-solid p-2"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-12">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl">Kategoriya</h2>
            <p>Kategoriya</p>
            <select
              className="h-[52px] w-[282px] rounded-md border border-solid p-2"
              onChange={e => setSubType(e.target.value)}
              value={subType}
              required
            >
              <option value="RENT" selected >Arenda</option>
              <option value="SALE">Sotish</option>
            </select>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-2xl">Narx</p>
              <p>Bir kunlik narx</p>
              <input
                type="text"
                onChange={e => setPriceDay(e.target.value)}
                value={priceDay}
                className="h-[52px] w-[282px] rounded-md border border-solid p-2"
              />
            </div>
            <div className="ml-5 mt-8">
              <p>Chegirmada Narxi</p>
              <input
                type="text"
                onChange={e => setPriceSale(e.target.value)}
                value={priceSale}
                className="h-[52px] w-[282px] rounded-md border border-solid p-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-2">
              <p>Dam Olish kunidagi Narx</p>
              <input
                type="text"
                onChange={e => setPriceWeekDay(e.target.value)}
                value={priceWeekDay}
                required
                className="h-[52px] w-[282px] rounded-md border border-solid p-2"
              />
            </div>
            <div className="ml-5">
              <p>Omonat protsenti</p>

              <select
                value={deposit}
                onChange={e => setDeposit(+e.target.value)}
                className="h-[52px] w-[282px] rounded-md border border-solid p-2"
              >
                <option value="0">0%</option>
                <option value="10">10%</option>
                <option value="20">20%</option>
                <option value="30">30%</option>
                <option value="40">40%</option>
                <option value="50">50%</option>
                <option value="60">60%</option>
                <option value="70">70%</option>
                <option value="80">80%</option>
                <option value="90">90%</option>
                <option value="100">100%</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-2xl">Vaqt</p>
            <p className="p-2">Kirish</p>
            <input
              type="time"
              value={entrace}
              onChange={e => setEntrace(e.target.value)}
              required
              className="h-[52px] w-full rounded-md border border-solid p-2"
            />
            <p className="p-2">Ketish</p>
            <input
              type="time"
              value={until}
              onChange={e => setUntil(e.target.value)}
              required
              className="h-[52px] w-full rounded-md border border-solid p-2"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-5">
              <p className="text-2xl">Qoidalar</p>
              <div>
                <label className="flex gap-5">
                  <input type="checkbox" checked={smoking} onChange={handleCheckboxSmoking} />
                  Chekishga ruhsat
                </label>
              </div>
              <div>
                <label className="flex gap-5">
                  <input type="checkbox" checked={alcohol} onChange={handleCheckboxAlcohol} />
                  Spirtli ichimliklarga ruhsat
                </label>
              </div>
              <div>
                <label className="flex gap-5">
                  <input type="checkbox" checked={pets} onChange={handleCheckboxPets} />
                  Uy hayvonlariga ruxsat
                </label>
              </div>
              <div>
                <label className="flex gap-5">
                  <input type="checkbox" checked={family} onChange={handleCheckboxFamily} />
                  Faqat Oila uchun
                </label>
              </div>
              <div>
                <label className="flex gap-5">
                  <input type="checkbox" checked={music} onChange={handleCheckboxMusic} />
                  Baland musiqalarga ruxsat
                </label>
              </div>
              <div>
                <label className="flex gap-5">
                  <input type="checkbox" checked={party} onChange={handleCheckboxParty} />
                  Bazmlarga ruxsat
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-2xl">Qulayliklar</p>
            <p className="p-2">Qulayliklarni tanlang (ixtiyoriy)</p>
            <Select
              mode="multiple"
              style={{ width: '600px', height: '60px', zIndex: 10 }}
              placeholder="Select conveniences"
            >
              {convenienceData &&
                convenienceData.map((item: any) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
      </div>
      <button type="submit" className="buttons mx-auto mb-10 h-[40px] w-[250px]" onClick={onFinish}>
        Elon Joylash
      </button>
    </form>
  );
};

export default Villas;
