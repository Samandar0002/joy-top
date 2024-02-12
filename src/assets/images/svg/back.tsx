import React from 'react';

const BackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props}
    width="256px"
    height="256px"
    viewBox="0 0 256 256"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(0, 256) scale(0.1, -0.1)" fill="#000000" stroke="none">
      <path d="M1029 2019 c-16 -6 -130 -134 -290 -326 -323 -387 -309 -369 -309 -413 0 -44 -14 -26 309 -413 276 -331 293 -347 355 -331 40 10 76 59 76 104 0 44 7 34 -239 330 l-161 195 642 5 c491 4 648 8 665 18 60 34 71 111 24 164 l-29 33 -651 5 -651 5 161 195 c247 297 239 286 239 331 0 72 -74 124 -141 98z" />
    </g>
  </svg>
);

export default BackIcon;
