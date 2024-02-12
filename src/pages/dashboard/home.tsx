import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { DachaIcon, ExtremeIcon, HotelIcon, HouseIcon, ResortsIcon, TourIcon } from '../../assets/images/svg';
import MoveableIcon from '../../components/moveableIcon';


interface HomeProps {}

const Home = (props: HomeProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();


  
  return (
    <section className="bg-yellow mt-[-50px] grid h-full w-[100vw] max-w-[1440px] place-items-center">
      <div className="grid h-[80%] w-[80%] grid-cols-3 place-items-center justify-center">
        <MoveableIcon>
          <div className="category-card dacha-card" onClick={() => navigate('/dachas')}>
            <div className="category-card-in">
              <DachaIcon />
              <p>{t('Dacha')}</p>
            </div>
          </div>
        </MoveableIcon>
        <MoveableIcon>
          <div className="category-card apartment-card" onClick={() => navigate('/apartments')}>
            <div className="category-card-in ">
              <HouseIcon className="mt-10" />
              <p>{t('Xonadonlar')}</p>
            </div>
          </div>
        </MoveableIcon>
        <MoveableIcon>
          <div className="category-card hotel-card" onClick={() => navigate('/hotels')}>
            <div className="category-card-in">
              <HotelIcon className="mt-10" />
              <p>{t('Mehmonxonalar')}</p>
            </div>
          </div>
        </MoveableIcon>
        <MoveableIcon>
          <div className="category-card resort-card" onClick={() => navigate('/resorts')}>
            <div className="category-card-in">
              <ResortsIcon className="mt-10" />
              <p>{t('Oromgohlar')}</p>
            </div>
          </div>
        </MoveableIcon>
        <MoveableIcon>
          <div className="category-card tour-card" onClick={() => navigate('/tours')}>
            <div className="category-card-in">
              <TourIcon className="mt-10" />
              <p>{t('Sayohat')}</p>
            </div>
          </div>
        </MoveableIcon>
        <MoveableIcon>
          <div className="category-card extreme-card" onClick={() => navigate('/extreme')}>
            <div className="category-card-in">
              <ExtremeIcon className="mt-10" />
              <p>{t('Ekstrim')}</p>
            </div>
          </div>
        </MoveableIcon>
      </div>
    </section>
  );
};

export default Home;
