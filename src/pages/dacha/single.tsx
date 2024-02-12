/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CommentSection from 'modules/dashboard/comment';

import DetailItem from 'assets/icon/detail';
import { Bedroom, Clocks, defaultImage,Rooms } from 'assets/icon/icon';
import { BackIcon } from 'assets/images/svg';

import Loader from '../../components/loader';
import { IEntity } from '../../modules/dashboard/singleType';
import Breadcrumb from '../../modules/dashboard/step';
import { http } from '../../services';

interface SingleDachaProps {}

const SingleDacha: React.FC<SingleDachaProps> = () => {
  const { singleID } = useParams<{ singleID?: string }>();
  const [dachaData, setDachaData] = useState<IEntity.SingleDachaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [additionalImageIndex, setAdditionalImageIndex] = useState(0);
  const navigate = useNavigate();
  const breadcrumbSteps = [
    { name: 'Home', path: '/' },
    { name: 'Dacha', path: '/dachas' }
  ];


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!singleID) {
        setError('No dacha ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await http.get(`/dacha/public/${singleID}`);

        if (response.data && response.data.data) {
          setDachaData(response.data);
        } else {
          setError('Invalid data structure received from server');
        }
      } catch (error) {
        setError('Error fetching dacha data');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [singleID]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  if (!dachaData) {
    return <div className="container mx-auto p-4 text-center">No data found</div>;
  }

  const imgList = dachaData.data.attachList;

  const additionalImages = imgList.slice(4);

  const handleNextImage = () => {
    if (additionalImages.length > 0) {
      setAdditionalImageIndex((prevIndex) => (prevIndex + 1) % additionalImages.length);
    }
  };


  const handlePreviousImage = () => {
    if (additionalImages.length > 0) {
      setAdditionalImageIndex((prevIndex) => (prevIndex - 1 + additionalImages.length) % additionalImages.length);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const imageSection = (
    <div className="container mx-auto my-8 p-4">
      <div className="-mx-2 flex flex-wrap">
        <div className="mb-4 w-full px-2 lg:w-2/3">
        <div className="aspect-w-16 h-[27rem] w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg">
             {imgList.length > 0 && currentImageIndex < imgList.length ? (
           <img
           src={imgList.length > 0 && currentImageIndex < imgList.length ? imgList[currentImageIndex].url : defaultImage}
           alt={`Dacha Main Image ${currentImageIndex}`}
           className="h-full w-full object-cover"
         />
            ) : (
              <img
              src={defaultImage}
              alt="Default Image"
              className="h-full w-full object-cover"
            />
            )}
           </div>
        </div>
        <div className="w-full px-2 lg:w-1/3">
          <div className="-mx-2 flex flex-wrap">
          {imgList.slice(0, 4).map((img: { id: string; size: number; url: string }, i: number) => (
           <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
        className={`mb-4 w-1/2 px-2 ${i === currentImageIndex ? 'ring-2 ring-[#ff7e47]' : ''}`}
           onClick={() => setCurrentImageIndex(i)}
         >
    <img
      src={img.url}
      alt={`Dacha Thumbnail ${i}`}
      className="h-52 w-full rounded-lg object-cover shadow-lg"
    />
  </div>
))}

          </div>
        </div>
      </div>
      {imgList.length > 4 && (
        <div className="mt-4 text-center">
          <button
            className="rounded bg-[#ff7e47] px-4 py-2 font-bold text-white hover:bg-[#ff7e47]"
            onClick={() => setShowAllImages(!showAllImages)}
          >
            {showAllImages ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}

      {showAllImages && (
        <div className="mt-4 text-center">
          {additionalImages.length > 0 && (
            <>
             <img
              src={additionalImages.length > 0 ? additionalImages[additionalImageIndex].url : defaultImage}
              alt={`Dacha Additional Image ${additionalImageIndex}`}
              className="mx-auto max-h-96 w-full rounded-lg object-cover shadow-lg"
              />
              <div className="my-4 flex justify-center gap-4">
                <button
                  className="rounded bg-[#ff7e47] px-4 py-2 font-bold text-white hover:bg-[#ff7e47]"
                  onClick={handlePreviousImage}
                >
                  Previous
                </button>
                <button
                  className="rounded bg-[#ff7e47] px-4 py-2 font-bold text-white hover:bg-[#ff7e47]"
                  onClick={handleNextImage}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );

  const detailsSection = (
    <div className="mb-4 h-[395px] space-y-2 rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">Details</h3>
      <DetailItem icon={Clocks} text={`Entry from: ${dachaData.data.enterTime}`} />
      <DetailItem icon={Clocks} text={`Departure until: ${dachaData.data.departureTime}`} />
      <DetailItem icon={Rooms} text={`Room : ${dachaData.data.roomCount}`} />
      <DetailItem icon={Bedroom} text={`Single Bedrooms: ${dachaData.data.singleBedRoomCount}`} />
      <DetailItem icon={Bedroom} text={`Double Bedrooms: ${dachaData.data.doubleBedRoomCount}`} />
    </div>
  );

  const amenitiesSection = (
    <div className="h-30 mb-4 h-[800px] rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">Amenities</h3>
      <ul className="list-none space-y-2">
        {dachaData.data.convenienceList.map((convenience: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <li key={convenience.id} className="text-sm text-gray-600">
            {convenience.name}
          </li>
        ))}
      </ul>
    </div>
  );

  const priceSection = (
    <div className="mb-4 h-[800px] rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">Prices</h3>
      <p className="mb-2 text-sm text-gray-600">Weekday Price: {dachaData.data.weekDayPrice}</p>
      <p className="text-sm text-gray-600">Weekend Price: {dachaData.data.weekendPrice}</p>

      <h3 className="mb-2 text-lg font-semibold">Ratings</h3>
      <div className="flex items-center">
        <span className="text-sm text-gray-500">☆☆☆☆☆</span>
      </div>
    </div>
  );

  const ContactSection = (
    <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">Contact</h3>
      <p className="mb-2 text-sm text-gray-600">
        Name: {dachaData?.data.profile.firstName} {dachaData?.data.profile.lastName}
      </p>
      <p className="mb-2 text-sm text-gray-600">Phone: {dachaData?.data.profile.phone}</p>
    </div>
  );

  const rulesSection = (
    <div className="mb-4 h-[392px] rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">Rules</h3>
      <p className="mb-2 text-sm text-gray-600">Smoking Allowed: {dachaData.data.smoking ? 'Yes' : 'No'}</p>
      <p className="mb-2 text-sm text-gray-600">Alcohol Allowed: {dachaData.data.alcohol ? 'Yes' : 'No'}</p>
      <p className="mb-2 text-sm text-gray-600">Pets Allowed: {dachaData.data.pets ? 'Yes' : 'No'}</p>
      <p className="mb-2 text-sm text-gray-600">Parties Allowed: {dachaData.data.party ? 'Yes' : 'No'}</p>
      <p className="mb-2 text-sm text-gray-600">Family Only: {dachaData.data.availableOnlyFamily ? 'Yes' : 'No'}</p>
      <p className="text-sm text-gray-600">Loud Music: {dachaData.data.loudlyMusic ? 'Yes' : 'No'}</p>
    </div>
  );

  const descriptionSection = (
    <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-2 text-lg font-semibold">Description</h3>
      <p className="text-sm text-gray-600">{dachaData.data.description}</p>
    </div>
  );

  return (
    <div className="container mx-auto p-[3rem]">
      <div className="mx-auto flex flex-col items-start space-y-4 ">
        <button onClick={goBack} className="flex h-12 w-12 items-center justify-center">
          <BackIcon className="h-full w-full" />
        </button>
        <Breadcrumb steps={breadcrumbSteps} className="mb-[2rem]" />
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        {isLoading ? (
          <Loader />
        ) : error || !dachaData ? (
          <div className="text-center text-gray-600">{error || 'No data found'}</div>
        ) : (
          <>
            {imageSection}
            <div className="mx-auto flex h-[800px] w-[1050px] flex-wrap">
              <div>
                <div className="w-[350px] px-2">{detailsSection}</div>
                <div className="w-[350px] px-2">{rulesSection}</div>
              </div>
              <div className="w-[350px] px-2">{amenitiesSection}</div>
              <div className="w-[350px] px-2">{priceSection}</div>
            </div>
            <div>
            {ContactSection}
            {descriptionSection}
            <CommentSection/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleDacha;
