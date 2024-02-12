import { useContext } from 'react';
import { Navigate, Route, Routes as Switch, useLocation } from 'react-router-dom';

import { Context } from 'modules/auth';

import { Apartment, Extreme, Hotels, Resort, Tours, Villas } from 'pages/add';
import { Confirm, Login, Register, Resend } from 'pages/auth';
import { SingleDacha } from 'pages/dacha';
import Dacha from 'pages/dacha/dacha';
import About from 'pages/dashboard/about';
import Home from 'pages/dashboard/home';
import { SingleExtreme } from 'pages/extreme';
import Extremes from 'pages/extreme/extreme';
import Hotel from 'pages/hotel/hotel';
import House from 'pages/house/house';
import SingleHouse from 'pages/house/single';
import {
  Conveniences,
  CountriesList,
  ExtremeList,
  Profile,
  ProfilesList,
  RegionList,
  Subscription,
  SubscriptionList,
  TransactionsList
} from 'pages/profile';
import { SingleResort } from 'pages/resort';
import Resorts from 'pages/resort/resorts';
import { SingleTravel } from 'pages/travel';
import Travel from 'pages/travel/travel';

import { Footer } from 'components';

import SingleHotel from '../pages/hotel/single';

import Protected from './protected';

const Routes = () => {
  const { user } = useContext(Context);

  const location = useLocation();
  const isAuthenticated = !!user;
  const isAdmin = user?.role.includes('ROLE_ADMIN');

  const homePath = location.pathname === '/';

  return (
    <>
      <Switch>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dachas" element={<Dacha />} />
          <Route path="apartments" element={<House />} />
          <Route path="hotels" element={<Hotel />} />
          <Route path="resorts" element={<Resorts />} />
          <Route path="tours" element={<Travel />} />
          <Route path="extreme" element={<Extremes />} />
          <Route path="dachas/joy/:singleID" element={<SingleDacha />} />
          <Route path="house/joy/:singleID" element={<SingleHouse />} />
          <Route path="hotels/joy/:singleID" element={<SingleHotel />} />
          <Route path="resorts/joy/:singleID" element={<SingleResort />} />
          <Route path="tours/joy/:singleID" element={<SingleTravel />} />
          <Route path="extreme/joy/:singleID" element={<SingleExtreme />} />

          <Route element={<Protected allowed={isAuthenticated} to="/auth/login" />}>
            <Route path="profile" element={<Profile />}>
              {isAdmin! && (
                <>
                  <Route path="profiles-list" element={<ProfilesList />} />
                  <Route path="region-list" element={<RegionList />} />
                  <Route path="countries-list" element={<CountriesList />} />
                  <Route path="extreme-list" element={<ExtremeList />} />
                  <Route path="conveniences" element={<Conveniences />} />
                  <Route path="subscription" element={<Subscription />} />
                  <Route path="subscription-list" element={<SubscriptionList />} />
                  <Route path="transactions-list" element={<TransactionsList />} />
                </>
              )}
            </Route>
            <Route path="add-villas" element={<Villas />} />
            <Route path="add-apartment" element={<Apartment />} />
            <Route path="add-hotel" element={<Hotels />} />
            <Route path="add-resort" element={<Resort />} />
            <Route path="add-tours" element={<Tours />} />
            <Route path="add-extreme" element={<Extreme />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Route>

        <Route path="auth" element={<Protected allowed={!isAuthenticated} to="/" />}>
          <Route index path="*" element={<Navigate to="/auth/login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm" element={<Confirm />} />
          <Route path="resend" element={<Resend />} />
        </Route>
      </Switch>
      {!homePath && <Footer />}
    </>
  );
};

export default Routes;
