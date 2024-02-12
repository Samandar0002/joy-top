/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CommentSection from 'modules/dashboard/comment';

import { defaultImage } from 'assets/icon/icon';
import { BackIcon } from 'assets/images/svg';

import Loader from '../../components/loader';
import { IEntity } from '../../modules/dashboard/singleType';
import Breadcrumb from '../../modules/dashboard/step';
import { http } from '../../services';


interface SingleTravelProps {}

const SingleTravel: React.FC<SingleTravelProps> = () => {
  const { singleID } = useParams<{ singleID?: string }>();
  const [travelData, settravelData] = useState<IEntity.SingleTravelResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [additionalImageIndex, setAdditionalImageIndex] = useState(0);
  const navigate = useNavigate();
  const breadcrumbSteps = [
    { name: 'Home', path: '/' },
    { name: 'Travel', path: '/tours' } 
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!singleID) {
        setError('No resort ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await http.get<IEntity.SingleTravelResponse>(`/travel/public/${singleID}`);

        if (response.data && response.data.data) {
          settravelData(response.data);
        } else {
          setError('Invalid data structure received from server');
        }
      } catch (err) {
        setError('Error fetching resort data');
        console.error('Error fetching data:', err);
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

  if (!travelData) {
    return <div className="container mx-auto p-4 text-center">No data found</div>;
  }

  const imgList = travelData.data.attachList;

  const additionalImages = imgList.slice(4);

   const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgList.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imgList.length) % imgList.length);
  };

  const goBack = () => {
    navigate(-1);
  };

  const imageSection = (
    <div className="container mx-auto my-8 p-4">
      <div className="-mx-2 flex flex-wrap">
        <div className="mb-4 w-full px-2 lg:w-2/3">
          <div className="aspect-w-16 h-[27rem] w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg">
            <img
              src={imgList.length > 0 && currentImageIndex < imgList.length ? imgList[currentImageIndex].url : defaultImage}
              alt={`Dacha Main Image ${currentImageIndex}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="w-full px-2 lg:w-1/3">
          <div className="-mx-2 flex flex-wrap">
            {imgList.slice(0, 4).map((img, i) => (
              <div
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
      {showAllImages && additionalImages.length > 0 && (
        <div className="mt-4 text-center">
          <img
            src={additionalImages[additionalImageIndex].url || defaultImage}
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
        </div>
      )}
    </div>
  );

  const priceSection = (
    <div className="mb-4 h-[400px] rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">Prices</h3>
      <p className="mb-2 text-sm text-gray-600">Weekday Price: {travelData.data.weekDayPrice}</p>
      <p className="text-sm text-gray-600">Weekend Price: {travelData.data.weekendPrice}</p>

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
        Name: {travelData?.data.profile.firstName} {travelData?.data.profile.lastName}
      </p>
      <p className="mb-2 text-sm text-gray-600">Phone: {travelData?.data.profile.phone}</p>
      <p className="mb-2 text-sm text-gray-600">Address: {travelData?.data.region?.nameUz ?? 'Not provided'}</p>
      <p className="mb-2 text-sm text-gray-600">Travel type: {travelData?.data.extremeType?.name ?? 'Not provided'}</p>
    </div>
  );

 

  const descriptionSection = (
    <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-2 text-lg font-semibold">Description</h3>
      <p className="text-sm text-gray-600">{travelData.data.description}</p>
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
        ) : error || !travelData ? (
          <div className="text-center text-gray-600">{error || 'No data found'}</div>
        ) : (
          <>
            {imageSection}
            <div className="mx-auto flex h-[500px] w-[1050px] flex-wrap">
              <div>
                <div className="w-[350px] px-2">{ContactSection}</div>
                <div className="w-[350px] px-2"> </div>
              </div>
              <div className="w-[350px] px-2"> </div>
              <div className="w-[350px] px-2">{priceSection}</div>
            </div>
            <div>
            <div className="   px-2">  {descriptionSection} </div>
            <CommentSection/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleTravel;

