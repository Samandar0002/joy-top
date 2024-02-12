import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface MoveableIconProps {
  children: React.ReactNode;
}

const MoveableIcon: React.FC<MoveableIconProps> = ({ children }) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iconRef.current) {
      VanillaTilt.init(iconRef.current, {
        max: 7,
        scale: 1.1
      });
    }
  }, []);

  return (
    <div ref={iconRef} className="transition duration-100 ease-in-out">
      {children}
    </div>
  );
};

export default MoveableIcon;
