// eslint-disable-next-line simple-import-sort/imports
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from 'modules/auth';
import { useTranslation } from 'react-i18next';
import { Logo } from 'assets/images/svg';

import i18n from '../i18n';
import Modal from './modal';

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigete = useNavigate();
  const { user, methods } = useContext(Context);
  const isAuthenticated = !!user;
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('LANGUAGE') || 'en');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      localStorage.setItem('LANGUAGE', lng);
      setSelectedLanguage(lng);
    });
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-[1] flex h-[80px] w-full items-center justify-between bg-white px-[11%] py-5 shadow-md ">
        <Logo />
        <div className="nav-buttons flex items-center gap-5">
          <Link to="/about">
            <button className="standart-button">{t('Biz haqimizda')}</button>
          </Link>

          <span>{user?.name}</span>

          <button className="buttons hover:bg-" onClick={handleOpenModal}>
            {t('Joy qo`shish')}
          </button>

          {isAuthenticated ? (
            <>
              <button className="standart-button" onClick={() => methods.logout()}>
                {t('Chiqish')}
              </button>
              <Link to="/profile">
                <button className="standart-button">{t('Profile')}</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="standart-button">{t('Kirish')}</button>
              </Link>
              <Link to="/auth/register">
                <button className="standart-button">{t('Ro`yhatdan o`tish')}</button>
              </Link>
            </>
          )}

          <select
            className="border-gray rounded-lg border px-3 py-1.5 hover:border-[#FF7E47]"
            onChange={e => setSelectedLanguage(e.target.value)} // Directly update state on change
            value={selectedLanguage}
          >
            <option value="uz">{t('Uz')}</option>
            <option value="ru">{t('Ru')}</option>
            <option value="en">{t('En')}</option>
          </select>
        </div>
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <h1 className="text-x pb-4 font-bold">{t('Nima Qo`shmoqchisiz ?')}</h1>
          <div
            className="grid grid-cols-2 gap-20"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
          >
            <div
              className="dacha grid cursor-pointer items-center rounded-lg bg-orange-500 text-white"
              style={{ width: '160px', height: '100px' }}
              onClick={() => {
                handleCloseModal();
                navigete('/add-villas');
              }}
            >
              <img src="https://joytop.uz/static/media/dacha-icon.58816c25.svg" alt="" className="mx-auto h-16 w-16" />
              <h1 className="mx-auto">{t('Dacha')}</h1>
            </div>
            <div
              className="xonadon grid cursor-pointer items-center rounded-lg bg-blue-500 text-white"
              style={{ width: '160px', height: '100px' }}
              onClick={() => {
                handleCloseModal();
                navigete('/add-apartment');
              }}
            >
              <img src="https://joytop.uz/static/media/home-icon.b4f47182.svg" alt="" className="mx-auto h-16 w-16" />
              <h1 className="mx-auto">{t('Xonadonlar')}</h1>
            </div>
            <div
              className="xonadon grid cursor-pointer items-center rounded-lg bg-purple-500 text-white"
              style={{ width: '160px', height: '100px' }}
              onClick={() => {
                handleCloseModal();
                navigete('/add-hotel');
              }}
            >
              <img src="https://joytop.uz/static/media/hotel-icon.afcd9dc6.svg" alt="" className="mx-auto h-16 w-16" />
              <h1 className="mx-auto">{t('Mehmonxonalar')}</h1>
            </div>
            <div
              className="oromgohlar grid cursor-pointer items-center rounded-lg bg-pink-500 text-white"
              style={{ width: '160px', height: '100px' }}
              onClick={() => {
                handleCloseModal();
                navigete('/add-resort');
              }}
            >
              <img src="https://joytop.uz/static/media/resort-icon.ff90aee3.svg" alt="" className="mx-auto h-16 w-16" />
              <h1 className="mx-auto">{t('Oromgohlar')}</h1>
            </div>
            <div
              className="sayohat grid cursor-pointer items-center rounded-lg bg-yellow-500 text-white"
              style={{ width: '160px', height: '100px' }}
              onClick={() => {
                handleCloseModal();
                navigete('/add-tours');
              }}
            >
              <img src="https://joytop.uz/static/media/tour-icon.de48103b.svg" alt="" className="mx-auto h-16 w-16" />
              <h1 className="mx-auto">{t('Sayohat')}</h1>
            </div>
            <div
              className="ekstrim grid cursor-pointer items-center rounded-lg bg-green-500 text-white"
              style={{ width: '160px', height: '100px' }}
              onClick={() => {
                handleCloseModal();
                navigete('/add-extreme');
              }}
            >
              <img
                src="https://joytop.uz/static/media/extreme-icon.a58277ba.svg"
                alt=""
                className="mx-auto h-16 w-16"
              />
              <h1 className="mx-auto">{t('Ekstrim')}</h1>
            </div>
          </div>
        </Modal>
      </div>
      <div className="h-[80px] w-full" />
    </>
  );
}
