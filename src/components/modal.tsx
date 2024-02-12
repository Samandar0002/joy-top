import { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const contentStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000
  };

  return (
    <div
      style={{ display: isOpen ? '' : 'none' }}
      className="fixed bottom-0 left-0 right-0 top-0 z-[99999] h-full w-full overflow-auto backdrop-blur-sm"
    >
      <div style={contentStyle}>
        {children}
        <button className="absolute right-2 top-2" onClick={onClose}>
          <IoMdClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
