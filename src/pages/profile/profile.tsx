import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Context } from 'modules/auth';

function Profile() {
  const { user } = useContext(Context);
  const isAdmin = user?.role.some(role => role === 'ROLE_ADMIN');

  return (
    <div className="w-100%">
      <div className="min-h-screen">
        <div className="mx-20 my-10 flex">
          <div className="flex flex-col  gap-6">
            <Link to="/profile">
              <button
                type="button"
                className="text-xm rounded-e-lg  rounded-s-lg  bg-transparent px-4 py-2 text-start font-medium text-gray-900   focus:z-10 focus:bg-[#ff7e47] focus:text-white "
              >
                Profile
              </button>
            </Link>
            {isAdmin && (
              <>
                <Link to="profiles-list">
                  <button
                    type="button"
                    className="text-xm rounded-e-lg  rounded-s-lg  bg-transparent px-4 py-2 text-start font-medium text-gray-900   focus:z-10 focus:bg-[#ff7e47] focus:text-white "
                  >
                    Profillar ro'yha
                  </button>
                </Link>
                <Link to="region-list">
                  <button
                    type="button"
                    className="text-xm rounded-e-lg  rounded-s-lg  bg-transparent px-4 py-2 text-start font-medium text-gray-900   focus:z-10 focus:bg-[#ff7e47] focus:text-white "
                  >
                    Viloyatlar listi
                  </button>
                </Link>
                <Link to="countries-list">
                  <button
                    type="button"
                    className="text-xm rounded-e-lg  rounded-s-lg  bg-transparent px-4 py-2 text-start font-medium text-gray-900   focus:z-10 focus:bg-[#ff7e47] focus:text-white "
                  >
                    Mamlakatlar listi
                  </button>
                </Link>
                <Link to="extreme-list">
                  <button
                    type="button"
                    className="text-xm rounded-e-lg  rounded-s-lg  bg-transparent px-4 py-2 text-start font-medium text-gray-900   focus:z-10 focus:bg-[#ff7e47] focus:text-white "
                  >
                    Extremallar
                  </button>
                </Link>
                <Link to="conveniences">
                  <button
                    type="button"
                    className="text-xm rounded-e-lg  rounded-s-lg  bg-transparent px-4 py-2 text-start font-medium text-gray-900   focus:z-10 focus:bg-[#ff7e47] focus:text-white "
                  >
                    Qulayliklar
                  </button>
                </Link>
                <Link to="subscription">
                  <button
                    type="button"
                    className="text-xm rounded-e-lg  rounded-s-lg  bg-transparent px-4 py-2 text-start font-medium text-gray-900   focus:z-10 focus:bg-[#ff7e47] focus:text-white "
                  >
                    Ta'riflar
                  </button>
                </Link>
                <Link to="subscription-list">
                  <button
                    type="button"
                    className="text-xm rounded-e-lg  rounded-s-lg  bg-transparent px-4 py-2 text-start font-medium text-gray-900   focus:z-10 focus:bg-[#ff7e47] focus:text-white "
                  >
                    Obunalar ro'yhati
                  </button>
                </Link>
                <Link to="transactions-list">
                  <button
                    type="button"
                    className="text-xm rounded-e-lg  rounded-s-lg  bg-transparent px-4 py-2 text-start font-medium text-gray-900   focus:z-10 focus:bg-[#ff7e47] focus:text-white "
                  >
                    Operatsiyalar ro'yhati
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="md:col-span-10">
            <div className="row">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
