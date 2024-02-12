import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import MoveableIcon from 'components/moveableIcon';

import { DachaIcon, ExtremeIcon, HotelIcon, HouseIcon, ResortsIcon, TourIcon } from '../../assets/images/svg';

const images = {
  dachas: require('../../assets/images/villas.jpg'),
  apartments: require('../../assets/images/apartments.jpg'),
  hotels: require('../../assets/images/hotel.jpg'),
  resorts: require('../../assets/images/resort.jpg'),
  tours: require('../../assets/images/tour.jpg'),
  extreme: require('../../assets/images/extreme.jpg')
};

const Navigation = () => {
  const location = useLocation();
  const visiblePaths = ['/dachas', '/apartments', '/hotels', '/resorts', '/tours', '/extreme'];
  const { t } = useTranslation();

  if (!visiblePaths.includes(location.pathname)) {
    return null;
  }
  if (location.pathname === '/') {
    return null;
  }

  const navItems = [
    { path: '/dachas', bgClass: 'bg-[#FF7E47]/70', label:t('Dacha'), image: images.dachas, Icon: DachaIcon },
    { path: '/apartments', bgClass: 'bg-[#426BFF]/70', label: t('Xonadonlar'), image: images.apartments, Icon: HouseIcon },
    { path: '/hotels', bgClass: 'bg-[#9747FF]/70', label: t('Mehmonxonalar'), image: images.hotels, Icon: HotelIcon },
    { path: '/resorts', bgClass: 'bg-[#FF5977]/70', label: t('Oromgohlar'), image: images.resorts, Icon: ResortsIcon },
    { path: '/tours', bgClass: 'bg-[#FFD059]/70', label: t('Sayohat'), image: images.tours, Icon: TourIcon },
    { path: '/extreme', bgClass: 'bg-[#45D891]/70', label: t('Ekstrim'), image: images.extreme, Icon: ExtremeIcon }
  ];

  return (
    <nav>
      <div className="mx-auto max-w-7xl">
        <ul className="flex list-none items-center justify-around p-3">
          {navItems.map(
            ({ path, bgClass, label, image, Icon }) =>
              location.pathname !== path && (
                <li key={path} className="flex-1">
                  <MoveableIcon>
                    <NavLink
                      to={path}
                      className={`flex max-w-xs flex-col items-center justify-center${bgClass} h-[150px] text-center no-underline`}
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {Icon && <Icon className="w-[50px]" />}
                      <span className="text-lg font-bold text-white">{label}</span>
                    </NavLink>
                  </MoveableIcon>
                </li>
              )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
