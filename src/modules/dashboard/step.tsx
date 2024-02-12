import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  steps: Array<{ name: string; path: string }>;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ steps }) => (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.name}>
              {!isLast && (
                <li>
                  <div className="flex items-center">
                    <Link to={step.path} className="text-sm font-medium text-gray-500 hover:text-gray-700">
                      {step.name}
                    </Link>
                    <svg className="w-6 h-6 text-orange-500 mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </li>
              )}
             
              {isLast && (
                 <Link to={step.path} >
                <li aria-current="page">
                  <div className="text-sm font-medium text-orange-600" >
                  {step.name}
                  </div>
                </li>
               
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );

export default Breadcrumb;
